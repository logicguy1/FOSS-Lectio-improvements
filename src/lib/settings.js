/**
 * SettingsStore provides methods to manage settings in the localStorage.
 */
const SettingsStore = {
  /**
   * The prefix used for all keys stored in the localStorage.
   * @type {string}
   */
  prefix: "settings_",

  /**
   * Retrieves a value from the localStorage settings based on the provided key.
   * If the value doesn't exist, sets it to the provided defaultValue.
   * @param {string} key - The key to retrieve the value for.
   * @param {string} defaultValue - The default value if the key doesn't exist.
   * @returns {string} The retrieved value or the defaultValue.
   * @throws {Error} If a default value is not provided for the key.
   */
  get(key, defaultValue) {
    if (defaultValue === undefined) {
      throw new Error("A default value must be provided for the key.");
    }

    const storedValue = localStorage.getItem(this.prefix + key);

    if (storedValue === null) {
      this.set(key, defaultValue);
      return defaultValue;
    }

    return storedValue;
  },

  /**
   * Retrieves a value from the localStorage settings based on the provided key.
   * Does not handle default values and is typically used for checking.
   * @param {string} key - The key to retrieve the value for.
   * @returns {string} The retrieved value.
   */
  simpleGet(key) {
    const storedValue = localStorage.getItem(this.prefix + key);
    return storedValue;
  },

  /**
   * Sets a value in the localStorage settings for the provided key.
   * @param {string} key - The key to set the value for.
   * @param {string} value - The value to set.
   */
  set(key, value) {
    localStorage.setItem(this.prefix + key, value);
  },

  /**
   * Removes a value from the localStorage based on the provided key.
   * @param {string} key - The key to remove the value for.
   */
  remove(key) {
    localStorage.removeItem(this.prefix + key);
  },

  /**
   * Clears all settings stored in the localStorage with the SettingsStore prefix.
   */
  clear() {
    const keysToRemove = Object.keys(localStorage).filter(key => key.startsWith(this.prefix));

    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });
  }
}

