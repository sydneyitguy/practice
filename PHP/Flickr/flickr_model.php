<?php
/**
 * Flickr Model
 * Get images with a search term, save them into the database
 * Note: This is just a simple practice, 
 * so I obmitted some security checks and exception handlings
 * 
 * @author: Sebastian Kim
 */

class Flickr {
	private $image_path;
	private $table_name;
	private $api_key;
	private $db;
	
	public function __construct($image_path, $table_name) {
		$this->image_path = $image_path;
		$this->table_name = $table_name;
		$this->api_key = '';
        
        $this->db = new mysqli("localhost", "user", "password", "world");
	}
	
	/**
	 * Get the url of photo / thumbnail
	 * @return string (url)
	 */
	public function get_photo_url($photo, $size = 'large') {
		if($size == 'thumb')
			$size = '_s';	// 75*75 thumbnail
		else
			$size = '_b';	// 1024 on long side
			
		
		return "http://farm{$photo['farm']}.static.flickr.com/{$photo['server']}/{$photo['id']}_{$photo['secret']}{$size}.jpg";
	}
	
	/**
	 * Request to Flickr REST API
	 * @return array (100 photos that matched with the search terms)
	 */
	public function request($search_term) {
		// Build the API URL to call
		$params = array(
			'api_key'	=> $this->api_key,
			'method'	=> 'flickr.photos.search',
			'text'		=> $search_term,
			'format'	=> 'php_serial'
		);
		$encoded_params = array();
		foreach ($params as $k => $v)
			$encoded_params[] = urlencode($k).'='.urlencode($v);
		
		
		// Call the API and decode the response
		$url = "http://api.flickr.com/services/rest/?".implode('&', $encoded_params);
		$result = file_get_contents($url);
		$result = unserialize($result);
		
		return $result['photos']['photo'];	// Return the first 100 results (default in API)
	}
	
	/**
	 * Save the records into the database, and also save images and thumbnails in downloads folder
	 * @return bool (true for success)
	 */
	public function save_photo_info($photo) {
		if($this->is_duplicated($photo['id']))	// Only if the id is not already there
			return FALSE;
		
		// Save photo and thumbnail in download folder
		$bool_image = $this->save_image($this->get_photo_url($photo), $this->image_path.'/'.$photo['id'].'.jpg');
		$bool_thumb = $this->save_image($this->get_photo_url($photo, 'thumb'), $this->image_path.'/thumbs/'.$photo['id'].'.jpg');
		
		// Saves into the database only if both image and thumbnail saved successfully
		if($bool_image && $bool_thumb) {
			$values = implode("', '", $photo);
			$stmt = $mysqli->prepare("INSERT INTO {$this->table_name} VALUES (?))");
			$stmt->bind_param("s", $values);
			$stmt->execute();
		}
		return TRUE;		
	}
		
	/**
	 * Check whether the photo a photo id is exists or not
	 * @return bool
	 */
	private function is_duplicated($id) {
		$stmt = $mysqli->prepare("SELECT count(*) FROM {$this->table_name} WHERE `id` = ?");
		$stmt->bind_param("s", $id);
		$stmt->execute();
		$result = $stmt->get_result();
		$myrow = $result->fetch_assoc();
		return ($row['count(*)'] > 0) ? TRUE : FALSE;
	}
	
	/**
	 * Grab the image from URL and save into the path
	 * @return bool (true for success)
	 */
	private function save_image($url, $path){
		$ch = curl_init ($url);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_BINARYTRANSFER,1);
		$rawdata = curl_exec($ch);
		curl_close ($ch);

		if(!file_exists($path)){
			$fp = fopen($path,'x');
		    fwrite($fp, $rawdata);
		    fclose($fp);
		    return TRUE;
		}
		
		return FALSE;
	}
	
	/**
	 * Get all list of photos in the database
	 * @return database pointer
	 */
	public function get_all() {
		$stmt = $mysqli->prepare("SELECT * FROM {$this->table_name} ORDER BY `id` DESC");
		$stmt->execute();
		
		return $stmt->get_result();
	}
	
	/**
	 * Destroy all database and downloaded files
	 * @return void
	 */
	public function reset() {
		foreach(glob($this->image_path.'/*.jpg') as $img)
			unlink($img);
		    
		foreach(glob($this->image_path.'/thumbs/*.jpg') as $thumbs)
			unlink($thumbs);
		    
		$stmt = $mysqli->prepare("TRUNCATE {$this->table_name}");
		$stmt->execute();
	}
}

/* EOF */