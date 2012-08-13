<?php
/**
 * Find all duplicated files under a path
 * @author Sebastian Kim
 */

class FindDuplicates {
  private $files = array();

  public function find($path) {
    $map = array();

    // FIXME: bottle neck, maybe check the size first then check hash
    foreach($this->getAllFiles($path) as $file) {
      $fileId = md5_file($file);
      $map[$fileId][] = $file;
    }

    foreach($map as $key => $files) {
      if(sizeof($files) == 1) {
        unset($map[$key]);
      }
    }
    return $map;
  }

  public function getAllFiles($path) {
    $this->getFiles($path);
    return $this->files;
  }

  // FIXME: should implement iterator
  private function getFiles($path) {
    if ($handle = opendir($path)) {
      while (false !== ($entry = readdir($handle))) {
        if ($entry != "." && $entry != "..") {
          $fullPath = $path . '/' . $entry;
          if(is_dir($fullPath)) {
            $this->getFiles($fullPath);
          } else {
            $this->files[] = $fullPath;
          }
        }
      }
      closedir($handle);
    }
  } 
}
?>