<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wp475');

/** MySQL database username */
define('DB_USER', 'wp475');

/** MySQL database password */
define('DB_PASSWORD', ']S)X7Z0p4j');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '8inznazyn450apafslprrpjvnunrsmabswdddelgvdtruslhpatvewvyxsrote0g');
define('SECURE_AUTH_KEY',  'adtez2kvt4amevihgtgwksn0hvvfd8zmklnhzztk3kuhecp0fwcxydpsgpszxzaz');
define('LOGGED_IN_KEY',    'zvhzdyaawacsijipiayqnp93bvtx77lgknklppqbrz5mgceusmmgfykp4qxmskhg');
define('NONCE_KEY',        '8sl6ogxnoskzr6ciihmlzy1uidfu8yq0m8idawhkmnsi8eafbhaaxtlg1bww2qyt');
define('AUTH_SALT',        '2c8ok6sq3hkvzrcqzqjw5sfyn0hlxk6snvypqkybamolj3vd3vpdybbmlezsyiwx');
define('SECURE_AUTH_SALT', '2rhetupdl3fmltcxoqrqcicsi26bleep2tiraj0w0l4idzyk5njbn7durq8i9bft');
define('LOGGED_IN_SALT',   'vh73ko4tvzcoxclktiiw6a4glywsj2u9mjaoulfrvcihvcac4xu8jvog1figerb3');
define('NONCE_SALT',       'gmbaqnfo5346kmtcqa2xsni5bdvybgxxbroiyduqbmbflhog0bobhzs3bsngg3f3');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wphz_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
