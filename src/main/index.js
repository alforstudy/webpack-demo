import {join} from 'lodash';
import './index.css'

function component() {
  var element = document.createElement('div');
  element.innerHTML = join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');
  return element;
}

document.querySelector('.app').appendChild(component());
