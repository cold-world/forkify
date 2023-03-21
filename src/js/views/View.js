import icons from '../../img/icons.svg';

export default class View {
  _data;

/**
 * Render the received object to the DOM 
 * @param {Object | Object[]} data the data to be rendered(recipe)
 * @param {boolean} [render=true] if false, create a template string instead of rendering to the DOM
 * @returns {undefined | string} a markup string is returned if render=false
 * @this {Object} view instance
 * @author cold-world
 * @todo finish
 */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
    this._data = data;
    const template = this._generateTemplate();

    if (!render) return template;
    this._clear();

    this._parentElement.insertAdjacentHTML('afterbegin', template);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  update(data) {
    this._data = data;
    const newTemplate = this._generateTemplate();

    const newDOM = document.createRange().createContextualFragment(newTemplate);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '')
        curEl.textContent = newEl.textContent;
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) => curEl.setAttribute(attr.name, attr.value));
      }
    });
  }

  renderSpinner() {
    const template = `
    <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div> 
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', template);
  }

  renderError(message = this._errorMessage) {
    const template = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', template);
  }

  renderMessage(message = this._message) {
    const template = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', template);
  }
}
