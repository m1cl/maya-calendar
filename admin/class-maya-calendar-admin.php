<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://ajala.io
 * @since      1.0.0
 *
 * @package    Maya_Calendar
 * @subpackage Maya_Calendar/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Maya_Calendar
 * @subpackage Maya_Calendar/admin
 * @author     Michael Ajala <michael@ajala.io>
 */
class Maya_Calendar_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}
    public function add_options_page() {
        $this->plugin_screen_hook_suffix = add_options_page(
            __('Maya Calendar Settings', 'maya-calendar'),
            __('Maya Calendar', 'maya-calendar'),
            'manage_options',
            $this->plugin_name,
            array($this, 'display_options_page')
        );
            /* debugger($this->plugin_screen_hook_suffix); */
    }
    /**
     * display_option_page
     *
     * Rendert die Admin Options Page 
     *
     * @return void
     */
    public function display_options_page() {
        include_once 'partials/index.html';
    }

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Plugin_Name_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Maya_Calendar_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/maya-calendar-admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Maya_Calendar_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Maya_Calendar_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/maya-calendar-admin.js', array( 'jquery' ), $this->version, false );

        /* if ( strpos( $_SERVER['REQUEST_URI'], 'plugins.php' ) !== false ) { */
			/* return; */
		/* } */

        /* // If development use the Webpack dev server url. */
        /* if ( defined( 'WP_ENV' ) && WP_ENV !== 'development' ) { */
        /*     $path = plugins_url( './admin/partials/build/bundle.js', __DIR__ . '/../../../' ); */
        /* } else { */
        /*     $path = 'http://localhost.wordpress/partials/build/bundle.js'; */
        /* } */
        /* wp_enqueue_script( */
        /*     'maya-calendar', */
        /*     $path, */
        /*     [], */
        /*     '', */
        /*     true */
        /* ); */


	}
}
