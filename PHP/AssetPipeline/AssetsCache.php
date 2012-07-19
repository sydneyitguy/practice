<?php
/**
 * AssetsCache - PHP Assets Pipelining / Caching
 * Compress assets into a single file to reduce the number of HTTP requests and the size
 * 
 * - cacheKey and type need to be specified to identify the group of assets
 * 
 * - Assets need to be store on {$cacheUrl}/{$type}/ (e.g. /assets/js/)
 * 
 * - Expiry can be set either 'footprint' or an integer(seconds)
 *   - Footprint method flushes cache if the file is modified, but the average running time can be slow
 *   - Time method would have faster average running time, but is not refreshed automatically if the files modified
 * 
 * - Known Issues
 *   - JSMin library is not perfect for every javascript files, thus the output need to be checked
 * 
 * @author    Sebastian.Kim <sydneyitguy@gmail.com>
 */

require dirname(__FILE__) . '/lib/JSMin.php';

class AssetsCache {
    protected static $instance;
    protected $global;
    protected $config = array(
        'assetPath'     => '/www/assets',
        'assetUrl'      => 'http://localhost/assets',

        'cachePath'     => '/www/cache',
        'cacheUrl'      => 'http://localhosts/cache',

        'expiry'        => 'footprint',
        'forceFlush?'   => false,
        'debugMode?'    => false,
        'compress?'     => true
    );

    public function __construct($config, $global = array('css' => array(), 
                                                         'js'  => array())) {
        self::$instance =& $this;
        $this->global = $global;
        $this->config = array_merge($this->config, $config);
        
        // Make a cache dir if doesn't exist
        if(!is_dir($this->config['cachePath'])) {
            try {
                mkdir($this->config['cachePath'], 0755, true);
            } catch(Exception $e) {
                $this->error('The cache path is invalid or permission blocked');
            }
        }
    }
    
    /**
     * Singleton
     * @return addr (self refernece of the static object)
     */
    public static function &getInstance() {
        return self::$instance;
    }
    
    public function getTags($cacheKey, $type, $assets = array(), $media = 'all') {
        $output = $this->get($cacheKey, $type, $assets);
        
        $tag = '';
        switch($type) {
            case 'js':
                foreach($output as $url) {
                    $tag .= "<script src=\"{$url}\"></script>\n";
                }
                break;
            case 'css':
                foreach($output as $url) {
                    $tag .= "<link rel=\"stylesheet\" href=\"{$url}\" media=\"{$media}\" />\n";
                }
                break;
        }
        return $tag;
    }

    /**
     * Get the url of compressed assets
     * @param string, string, array (e.g. 'gallery', 'js', $assetsUrls)
     * @return array (cached URL / raw files' URLs if failed)
     */
    public function get($cacheKey, $type, $assets) {
        // Add global assets
        if(array_key_exists($type, $this->global) && !empty($this->global[$type])) {
            $assets = array_merge($this->global[$type], $assets);
        }

        // Output raw files if debug mode set
        $rawOutput = $this->getFullUrls($assets);
        if($this->config['debugMode?'] == true) {
            return $rawOutput;
        }

        $key = $this->getKey($cacheKey, $assets);
        if(!$this->exists($key, $type)) {
            try {
                $this->set($key, $type, $assets);
            } catch(Exception $e) {
                $this->error($e->getMessage());

                return $rawOutput; // Return raw files if failed
            }
        }

        // Return cached URL if succeed
        // output in an array to provide the same interface with raw output
        return array($this->config['cacheUrl'] . '/' . $key . '.' . $type);
    }
    
    /**
     * Get absolute url
     * @param array
     * @return array (asset URLs)
     */
    protected function getFullUrls($assets) {
        $output = array();
        foreach ($assets as $asset) {
            $output[] = $this->contcatPath($this->config['assetUrl'], $asset);
        }
        return $output;
    }
    
    /**
     * Concatenate the path properly
     * @param string, string
     * @return string
     */
    protected function contcatPath($path, $file) {
        return rtrim($path, '/') . '/' . ltrim($file, '/');
    }
    

    /**
     * Get the cache key
     * @return string
     */
    protected function getKey($cacheKey, $assets) {
        $key = preg_replace('/[^A-Za-z0-9_]/', '-', $cacheKey);
        
        // If the expiry set by time, we don't need to put 
        // any information on the file name as we use filetime() function
        if(is_numeric($this->config['expiry'])) {
            return $key;
        }
        
        // If the expiry set by footprint,
        // generate a unique hashed file name according to the file content
        $hash = '';
        foreach($assets as $asset) {
            $hash .= hash_file('md5', $this->contcatPath($this->config['assetPath'], $asset)) . '-';
        }

        return $key . '-' . md5($hash);
    }
    
    /**
     * Check whether the assets are in the cache or not
     * @return bool
     */
    protected function exists($key, $type) {
        $file = $this->config['cachePath'] . '/' . $key . '.' . $type;
        
        // Force flush
        if($this->config['forceFlush?'] == true) {
            $this->delete($key, $type);
            return false;
        }
        
        // If file doesn't exist
        if(!file_exists($file)) {
            // If expiry is set by footprint
            if($this->config['expiry'] == 'footprint')
                $this->delete($key, $type);
            
            return false;
        } 
        // If file exists
        else {
            // If expiry is set by the time
            if(is_numeric($this->config['expiry']) && filemtime($file) + $this->config['expiry'] < time()) {
                // Delete expired cache
                $this->delete($key, $type);
                return false;
            }
            
            return true;
        }
    }
    
    /**
     * Set asset cache
     * @return bool
     */
    protected function set($key, $type, $assets) {
        if(!$key || !$type || !$assets) {
            return false;
        }

        $content = $this->compress($assets, $type);
        // Write the merged content into a file
        if(!$fp = fopen($this->config['cachePath'] . '/' . $key . '.' . $type, 'w')) {
            throw new Exception('Writing asset cache failed');
        }
        fwrite($fp, $content);
        fclose($fp);

        return true;
    }

    /**
     * Delete the cache file
     * @return void
     */
    protected function delete($key, $type) {
        $file = $this->config['cachePath'] . '/' . $key . '.' . $type;
        
        if(is_numeric($this->config['expiry'])) {
            if(file_exists($file))
                unlink($file);
        } else {
            $cacheKey = substr($key, 0, strrpos($key, '-'));
            if($match = glob($this->config['cachePath'] . '/' . $cacheKey . '-*.' . $type)) {
                foreach($match as $path)
                    unlink($path);
            }
        }
    }
    
    /**
     * Merge the assets
     * @param array
     * @return string
     */
    protected function compress($assets, $type) {
        $packed = '';
        
        foreach($assets as $asset) {
            $content = $this->getContent($asset);
            if(!$content) {
                $this->error("{$asset} - Load failed");
            } else {
                // Basic compression for CSS file
                if($type == 'css') {
                    $pathinfo = pathinfo($asset);
                    $url = $this->config['assetUrl'] . '/' . $pathinfo['dirname'];
                    // Transform image URL to the absolute path
                    $content = preg_replace('/url\s*\(\s*[\'"]?(\.\.[\S+\'"]+?)[\'"]?\)/', 
                                            'url(\''.$url.'/${1}\')', $content);
                    // Remove comments    
                    $content = preg_replace("/\/\*.*\*\//sU", '', $content);
                    // Remove spaces and new lines
                    $content = preg_replace("/[ \t\n\r]+/s", ' ', $content);
                    
                }
                $filename = end(explode('/', $asset));
                $packed .= "\n// {$filename} ---\n\n{$content}\n";
            }
        }
        
        if($this->config['compress?'] && $type == 'js') {
            return JSMin::minify($packed);
        }
        return $packed;
    }

    /**
     * Get the actual content
     * @param string (asset location)
     * @return string
     */
    protected function getContent($asset) {
        $filename = $this->config['assetPath'] . '/' . $asset;
        $fp = fopen($filename, 'r');
        $content = fread($fp, filesize($filename));
        fclose($fp);
        return $content;
    }
    
    /**
     * Print error message for debug
     * @return void
     */
    protected function error($msg) {
        error_log($msg);
    }
}