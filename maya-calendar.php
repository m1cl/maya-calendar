<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://ajala.io
 * @since             1.0.0
 * @package           Maya_Calendar
 *
 * @wordpress-plugin
 * Plugin Name:       Maya Calendar
 * Plugin URI:        http://ajala.io/maya-calendar
 * Description:       A calendar plugin for managing events.
 * Version:           1.0.0
 * Author:            Michael Ajala
 * Author URI:        http://ajala.io/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       maya-calendar
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-maya-calendar-activator.php
 */
function activate_maya_calendar() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-maya-calendar-activator.php';
	Maya_Calendar_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-maya-calendar-deactivator.php
 */
function deactivate_maya_calendar() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-maya-calendar-deactivator.php';
	Maya_Calendar_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_maya_calendar' );
register_deactivation_hook( __FILE__, 'deactivate_maya_calendar' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-maya-calendar.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_maya_calendar() {
	$plugin = new Maya_Calendar();
	$plugin->run();

}
run_maya_calendar();
