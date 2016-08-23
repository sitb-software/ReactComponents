import Component from '../AbstractComponent';

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/8/23
 */
class AbstractFormComponent extends Component {

  /**
   * get component value
   * @return {null}
   */
  getValue() {
    return null;
  }

  /**
   * @function
   */
  valid() {
    console.log('valid');
  }

}

export default AbstractFormComponent;
