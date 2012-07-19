<?php
/**
 * Demo - PHP Assets Pipelining / Caching
 * Compress assets into a single file to reduce the number of HTTP requests and the size
 * 
 * - General usage: 
 *      $AssetsCache->printJS('group_name', $files_array)
 *      $AssetsCache->printCSS('group_name', $files_array, <media type>)
 * - Assets can be grouped with a unique group name
 * - Expiry can be set either 'footprint'(automatic) or an integer(seconds)
 * 
 * @author    Sebastian.Kim <sydneyitguy@gmail.com>
 */

define ('PATH_ROOT',    dirname(__FILE__));
define ('PATH_ASSETS',  PATH_ROOT . '/assets');
define ('PATH_CACHE',   PATH_ROOT . '/cache');

//require PATH_ROOT .'/AssetsCache_Mem.php';
require PATH_ROOT .'/AssetsCache.php';

// Config
$config = Array(
    'assetPath'     => PATH_ASSETS,
    'cachePath'     => PATH_CACHE,
    'expiry'        => 'footprint',
);

$global = Array(
    'css' => Array(
        'vendor/bootstrap/css/bootstrap.css',
        'css/global.css'
    ),
    'js'  => Array(
        'vendor/jquery-1.7.2.js',
        'vendor/bootstrap/js/bootstrap.js'
    )
);

// Asset group for gallery page
$gallery = Array(
    'css' => Array(
        'vendor/photoswipe/code.photoswipe.jquery-3.0.5.js'
    ),
    'js'  => Array(
        'vendor/photoswipe/photoswipe.css'
    )
);

$assetsCache = new AssetsCache($config, $global);
?>

<!doctype html>
<html>
    <head>
        
        <!-- Load Global CSS files -->
        <?=$assetsCache->getTags('mobile_global', 'css')?>
        <!-- // Load Global CSS files -->
        
        <title>PHP Asset Pipelining Demo</title>
    </head>
    <body>
        <table class="table table-bordered">
            <tr>
                <td colspan="2">
                    <h1>Group1 - Global Assets</h1>
                </td>
            </tr>
            <tr>
                <th>Input</th>
                <th>Output</th>
            </tr>
            <tr>
                <td>
                    <pre><?php print_r($global); ?></pre>
                </td>
                <td>
                    <h2>Stylesheets</h2>
                    <ol>
                        <?php foreach($assetsCache->get('basic', 'css', $global['css']) as $style): ?> 
                        <li><a href="<?=$style?>" target="_blank"><?=$style?></a></li>
                        <?php endforeach; ?>
                    </ol>
                    
                    <h2>Javascripts</h2>
                    <ol>
                    <?php foreach($assetsCache->get('basic', 'js', $global['js']) as $script): ?> 
                        <li><a href="<?=$script?>" target="_blank"><?=$script?></a></li>
                    <?php endforeach; ?>
                    </ol>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <h1>Group2 - Gallery Assets</h1>
                </td>
            </tr>
            <tr>
                <th>Input</th>
                <th>Output</th>
            </tr>
            <tr>
                <td>
                    <pre><?php print_r($gallery); ?></pre>
                </td>
                <td>
                    <h2>Stylesheets</h2>
                    <ol>
                        <?php foreach($assetsCache->get('gallery', 'css', $gallery['css']) as $style): ?> 
                            <li><a href="<?=$style?>" target="_blank"><?=$style?></a></li>
                        <?php endforeach; ?>
                    </ol>
                    
                    <h2>Javascripts</h2>
                    <ol>
                        <?php foreach($assetsCache->get('gallery', 'js', $gallery['js']) as $script): ?> 
                            <li><a href="<?=$script?>" target="_blank"><?=$script?></a></li>
                        <?php endforeach; ?>
                    </ol>
                    <div class="alert alert-info">
                        <i class="icon-info-sign"></i>
                        This ouput will include both Global and Gallery assets
                    </div>
                </td>
            </tr>
        </table>
    </body>
</html>