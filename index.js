/**
  *  BrownJs
  *
  *  @author SevensChan
  *
 **/
import Brown from './core/Brown.js'

/**
 *   Server Config
**/ 
const HTTP_IP = '127.0.0.1';
const HTTP_PORT = 8899;
var brown = new Brown();
brown.listen(HTTP_PORT,HTTP_IP);
brown.set("view engine","ejs");