<?php
/**
 * Subclass usingi Memcache to store assets
 * 
 * NginX rewrite assets' url to ouput the file from memcache
 * 
 * NginX Config Example 
 *     
    location ~* /assets/cache/(.+)\.js$ {
        expires max;
        gzip on;
        set $memcached_key $1.js;
        memcached_pass 127.0.0.1:11211;
        default_type text/javascript;
    }

    location ~* /assets/cache/(.+)\.css$ {
        expires max;
        gzip on;
        set $memcached_key $1.css;
        memcached_pass 127.0.0.1:11211;
        default_type text/css;
    }
 * 
 * @author    Sebastian.Kim <sydneyitguy@gmail.com>
 */

require_once dirname(__FILE__) . '/AssetsCache.php';

class AssetsCache_Mem extends AssetsCache {
    private $cache;
    private $memKeyPrefix = '';
    protected static $instance;
    
    public function __construct($config, 
                                $global = array('css' => array(),
                                                'js'  => array())
                                $cacheInstance) {
        self::$instance =& $this;
        $this->global = $global;
        $this->config = array_merge($this->config, $config);
        
        $this->cache = $cacheInstance;
    }

    /**
     * Singleton
     * @return addr (self refernece of the static object)
     */
    public static function &getInstance() {
        return self::$instance;
    }
    
    public function setPrefix($prefix) {
        $this->memKeyPrefix = $prefix;
    }

    /**
     * Check whether the assets are in the cache or not
     * @return bool
     */
    protected function exists($key, $type) {
        // Force flush
        if($this->config['forceFlush?'] == true) {
            $this->delete($key, $type);
            return false;
        }
        
        // Cache key is the file name on the memory
        $memCacheKey = $this->getMemcacheKey($key, $type);

        // If file doesn't exist
        if($this->cache->get($memCacheKey) === false) {
            return false;
        } 
        // If file exists
        else {
            // If expiry is set by the time
            if(is_numeric($this->config['expiry'])) {
                $expiry = $this->cache->get($memCacheKey.'_expiry');
                if($expiry + $this->config['expiry'] < time()) {
                    return false;
                }
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
        
        // Write the merged content into the memory
        $memCacheKey = $this->getMemcacheKey($key, $type);
        $this->cache->set($memCacheKey, $content);
        if(is_numeric($this->config['expiry'])) {
            $this->cache->set($memCacheKey . '_expiry', time());
        }

        return true;
    }

    protected function getMemcacheKey($key, $type) {
        return $this->memKeyPrefix . $key . '.' . $type;
    }
}
/* EOF */