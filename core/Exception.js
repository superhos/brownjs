/**
 * Exceptions Class
 *
 * @package		CodeIgniter
 * @subpackage	Libraries
 * @category	Exceptions
 * @author		EllisLab Dev Team
 * @link		http://codeigniter.com/user_guide/libraries/exceptions.html
 */
class Exception {
	/**
	 * Constructor
	 */
	constructor(view){
		this.view = view;
	}

	// --------------------------------------------------------------------

	/**
	 * 404 Page Not Found Handler
	 *
	 * @access	private
	 * @param	string	the page
	 * @param 	bool	log error yes/no
	 * @return	string
	 */
	show_404(page = '', log_error = true)
	{
		var heading = "404 Page Not Found";
		var message = "The page you requested was not found.";

		this.show_error(heading, message, 'error_404', 404);
	}

	// --------------------------------------------------------------------

	/**
	 * General Error Page
	 *
	 * This function takes an error message as input
	 * (either as a string or an array) and displays
	 * it using the specified template.
	 *
	 * @access	private
	 * @param	string	the heading
	 * @param	string	the message
	 * @param	string	the template name
	 * @param 	int		the status code
	 * @return	string
	 */
	show_error(heading, message, template = 'error_general', status_code = 500)
	{
		this.set_status_header(status_code);

		message = '<p>'  + ((! Array.isArray(message)) ? message : message.join(',')) + '</p>';

		this.view.assign('msg',message);
		this.view.display('../../core/errors/'+template + '.ejs');
	}

	set_status_header(code = 200, text = '')
	{
		var stati = {
					200	: 'OK',
					201	: 'Created',
					202	: 'Accepted',
					203	: 'Non-Authoritative Information',
					204	: 'No Content',
					205	: 'Reset Content',
					206	: 'Partial Content',

					300	: 'Multiple Choices',
					301	: 'Moved Permanently',
					302	: 'Found',
					304	: 'Not Modified',
					305	: 'Use Proxy',
					307	: 'Temporary Redirect',

					400	: 'Bad Request',
					401	: 'Unauthorized',
					403	: 'Forbidden',
					404	: 'Not Found',
					405	: 'Method Not Allowed',
					406	: 'Not Acceptable',
					407	: 'Proxy Authentication Required',
					408	: 'Request Timeout',
					409	: 'Conflict',
					410	: 'Gone',
					411	: 'Length Required',
					412	: 'Precondition Failed',
					413	: 'Request Entity Too Large',
					414	: 'Request-URI Too Long',
					415	: 'Unsupported Media Type',
					416	: 'Requested Range Not Satisfiable',
					417	: 'Expectation Failed',

					500	: 'Internal Server Error',
					501	: 'Not Implemented',
					502	: 'Bad Gateway',
					503	: 'Service Unavailable',
					504	: 'Gateway Timeout',
					505	: 'HTTP Version Not Supported'
				};

				this.view.setHeader(code, {
			'Content-Type': 'text/plain' });
	}

}

export default Exception;
// END Exceptions Class

/* End of file Exception.php */