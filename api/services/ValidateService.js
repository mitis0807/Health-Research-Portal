/**
 * ValidateService.js
 * @help        :: See http://sailsjs.com/documentation/anatomy/my-app/api/services
 */
const assert = require('assert');
const moment = require('moment');

module.exports = {

  validate(args, callback) {
    Logger.debug('ValidateService.validate');
    Logger.verbose(`args.length :${args.length}`);
    console.log(`args.length in validate service :${args.length}`)
    const validationErrMsg = [];

    const rules = {
      notEmpty(name, value, rule) {
        rule.message = rule.message !== undefined ? rule.message : `Please enter ${name}`;
        Logger.warn(name);
        if (typeof value === 'string') {
          value = value.trim();
          assert.ok(value, rule.message);
        } else {
          assert.ok(value !== undefined, rule.message);
        }
      },
      boolean(name, value, rule) {
        rule.message = rule.message !== undefined ? rule.message : `${name} must be a boolean`;
        assert.equal(typeof (value), 'boolean', rule.message);
      },
      isTruthy(name, value, rule) {
        rule.message = rule.message !== undefined ? rule.message : `Please enter ${name}`;
        Logger.warn(name);
        if (typeof value === 'string') {
          value = value.trim();
          assert.ok(value, rule.message);
        } else {
          assert.ok(value, rule.message);
        }
      },
      integer(name, value, rule) {
        rule.message = rule.message !== undefined ? rule.message : `${name} must be a number`;
        assert.equal(typeof (value), 'number', rule.message);
      },
      string(name, value, rule) {
        Logger.verbose('string');
        rule.message = rule.message !== undefined ? rule.message : `${name} must be a string`;
        assert.equal(typeof (value), 'string', rule.message);
      },
      stringLength(name, value, rule) {
        Logger.verbose('stringLength');
        rule.message = rule.message !== undefined ? rule.message : `${name} must be a string of ${rule.minLength} - ${rule.maxLength}`;
        if (typeof value !== 'string' || !(value.length <= rule.maxLength) || !(value.length >= rule.minLength)) {
          throw new Error(rule.message);
        }
      },
      maxLengthString(name, value, rule) {
        Logger.verbose('maxLengthString');
        rule.message = rule.message !== undefined ? rule.message : `${name} must be a string of ${rule.maxLength}`;
        if (typeof value !== 'string' || !(value.length <= rule.maxLength)) {
          throw new Error(rule.message);
        }
      },
      minLengthString(name, value, rule) {
        Logger.verbose('minLengthString');
        rule.message = rule.message !== undefined ? rule.message : `${name} must be a string of ${rule.maxLength}`;
        if (typeof value !== 'string' || !(value.length >= rule.minLength)) {
          throw new Error(rule.message);
        }
      },
      range(name, value, rule) {
        Logger.verbose('range');
        rule.message = rule.message !== undefined ? rule.message : `Please enter ${name} between ${rule.min} to ${rule.max}`;

        if (rule.min > value || rule.max < value) {
          throw new Error(rule.message);
        }
      },
      email(name, value, rule) {
        rule.message = rule.message !== undefined ? rule.message : `Please enter valid ${name}`;
        const re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (value && !re.test(value)) {
          throw new Error(rule.message);
        }
      },
      regex(name, value, rule) {
        Logger.verbose('regex');
        Logger.verbose(value);
        rule.message = rule.message !== undefined ? rule.message : `Please enter valid ${name}`;
        const re = rule.regex;
        if (value && !re.test(value)) {
          throw new Error(rule.message);
        }
      },
      ISODate(name, value, rule) {
        Logger.verbose('ISODate');
        rule.message = rule.message !== undefined ? rule.message : `Please enter valid ${name}`;
        if (value && !moment(value, moment.ISO_8601, true).isValid()) {
          throw new Error(rule.message);
        }
      },
      isDateFormat(name, value, rule) {
        Logger.verbose('ISODate');
        rule.message = rule.message !== undefined ? rule.message : `Please enter valid ${name}`;
        if (value && !moment(value, rule.format, true).isValid()) {
          throw new Error(rule.message);
        }
      },
      compareDates(name, value, rule) {
        rule.message = rule.message !== undefined ? rule.message : `Please enter valid ${name}`;
        if (value && !moment(value, rule.format, true).isValid()) {
          return callback(new Error('Invalid date format'));
        }
        if (value && (!rule.value || !moment(value, rule.format, true).isValid())) {
          return callback(new Error('Invalid compare date format'));
        }
        if (rule.compare === 'gt') {
          if (value && (moment(value, rule.format).toDate() <= moment(rule.value, rule.format).toDate())) {
            throw new Error(rule.message);
          }
        }
      },
      isEqual(name, value, rule) {
        Logger.verbose('isEqual');
        rule.message = rule.message !== undefined ? rule.message : `${name} should be equal to ${rule.name}`;
        if (value && value !== rule.value) { throw new Error(rule.message); }
      },
      isPasswordStrong(name, value, rule) {
        Logger.verbose('isPasswordStrong');

        const message = CustomValidator.validatePassword(value);
        if (message) {
          rule.message = rule.message !== undefined ? rule.message : message;
          throw new Error(rule.message);
        }
      },
      contentInList(name, value, rule) {
        Logger.verbose('contentInList');
        rule.message = rule.message !== undefined ? rule.message : `Please select from ${name}`;
        if (value) {
          if (rule.list.indexOf(value) === -1) {
            throw new Error(rule.message);
          }
        }
      },
      isNonEmptyArray(name, value, rule) {
        Logger.verbose('isNonEmptyArray');
        rule.message = rule.message !== undefined ? rule.message : `${name} cannot be empty.`;
        if (value) {
          Logger.warn(value);
          Logger.warn(value.length);
          Logger.warn(Array.isArray(value));
          if (!Array.isArray(value) || !value.length) {
            Logger.warn('In warn isNonEmptyArray');
            throw new Error(rule.message);
          }
        }
      },
      isArray(name, value, rule) {
        Logger.verbose('isNonEmptyArray');
        rule.message = rule.message !== undefined ? rule.message : `${name} is not an Array.`;
        if (value) {
          if (!Array.isArray(value)) {
            throw new Error(rule.message);
          }
        }
      },
      stdDate(name, value, rule) {
        Logger.verbose('stdDate');
        rule.message = rule.message !== undefined ? rule.message : `Please enter valid ${name}`;
        if (!moment(value, 'DD-MM-YYYY').isValid()) {
          throw new Error(rule.message);
        }
      },
      fileExtension(name, value, rule) {
        const filenames = value;
        let fileExtensions;
        if (Array.isArray(rule.value)) {
          fileExtensions = rule.value.join('|');
        } else {
          fileExtensions = rule.value;
        }
        const fileRegex = new RegExp(`(?:${fileExtensions})$`);

        if (Array.isArray(filenames)) {
          for (let j = 0; j< filenames.length; j++) {
            let name1 = `file[${j}]`;
            console.log('name1',name1)
            const filename = filenames[i];
            var fileExtention = (filename.split('.')[filename.split('.').length - 1] != undefined) ? filename.split('.')[filename.split('.').length - 1].toLowerCase() : '';
            if (!fileExtention.match(fileRegex)) {
              throw new Error(rule.message);
            }
          }
        } else {
          let name1 = filenames;
          let fileExtention1 = (name1.split('.')[name1.split('.').length - 1] != undefined) ? name1.split('.')[name1.split('.').length - 1].toLowerCase() : '';
          if (!fileExtention1.match(fileRegex)) {
            throw new Error(rule.message);
          }
        }
      },
      URL(name, value, rule) {
        rule.message = rule.message !== undefined ? rule.message : `Please enter valid url ${name}`;
        const re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
        Logger.warn(value);
        Logger.warn(re.test(value));
        if (value && !re.test(value)) {
          throw new Error(rule.message);
        }
      },
      roleIdEnum(name, value, rule) {
        Logger.verbose('roleIdRange');
        Logger.verbose(rule);
        Logger.verbose((rule.roleIds).includes(value));

        rule.message = rule.message !== undefined ? rule.message : `Please enter valid role`;

        if (value && !((rule.roleIds).includes(value))) {
          throw new Error(rule.message);
        }
      },
    };

    for (var i = 0; i < args.length; i++) {
      Logger.verbose(`Name : ${args[i].name}`);
      console.log(`Name : ${args[i].name}`);
      for (let j = 0; j < args[i].validations.length; j++) {
        try {
          console.log('in try of validate service')
          rules[args[i].validations[j].validation](args[i].name, args[i].value, args[i].validations[j]);
        } catch (e) {
          console.log('in catch')
          let tempJson = {};
          if (args[i].status === undefined) {
            console.log('args in validate service',args[i] )
            tempJson = { name: args[i].name, value: args[i].value, validations: [args[i].validations[j]] };
            console.log('catch if tempJson = ', tempJson)
            
          } else {
            console.log('catch else',args[i] )
            tempJson = {
              status: args[i].status, name: args[i].name, value: args[i].value, validations: [args[i].validations[j]],
            };
            console.log('catch else tempJson = ', tempJson)
          }
          validationErrMsg.push(tempJson);
          console.log('validationErrMsg in catch', JSON.stringify(validationErrMsg));
          break;
        }
      }
    }
    if (i === args.length) {
      Logger.verbose(JSON.stringify(validationErrMsg));
      console.log('validationErrMsg', JSON.stringify(validationErrMsg));
      return callback(null, validationErrMsg);
    }
  },
  getValidateMsg(arr, callback) {
    Logger.debug('ValidateService.getValidateMsg');
    try {
      const errMsg = [];
      for (var i = 0; i < arr.length; i += 1) {
        for (let j = 0; j < arr[i].validations.length; j += 1) {
          errMsg.push(arr[i].validations[j].message);
        }
      }
      if (i === arr.length) {
        return callback(null, errMsg);
      }
    } catch (e) {
      return callback(e);
    }
  },
};
