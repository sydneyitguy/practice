CREATE TABLE IF NOT EXISTS `flickr_images` (
  `id` varchar(20) NOT NULL,
  `owner` varchar(20) NOT NULL,
  `secret` varchar(15) NOT NULL,
  `server` int(11) NOT NULL,
  `farm` tinyint(4) NOT NULL,
  `title` varchar(255) NOT NULL,
  `ispublic` tinyint(1) NOT NULL,
  `isfriend` tinyint(1) NOT NULL,
  `isfamily` tinyint(1) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;