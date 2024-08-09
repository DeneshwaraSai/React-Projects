export class StringSupport {
  static isBlank(str: string | String): boolean {
    if (str === null || str === undefined) {
      return true;
    } else {
      if (str.trim() === "") {
        return true;
      }
    }

    return false;
  }

  static isNotBlank(str: string | String): boolean {
    if (str === null || str === undefined) {
      return false;
    } else {
      if (str.trim() === "") {
        return false;
      }
    }

    return true;
  }
}
