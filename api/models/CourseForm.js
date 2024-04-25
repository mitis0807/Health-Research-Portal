module.exports = {

    tableName: 'fijihrp_course_schedule_form',
  
    attributes: {
      courseId: {
        type: 'string',
      },
  
      term: {
        type: 'string',
      },
    //   signedByChair:{
    //       type:'boolean',
    //       defaultsTo:false,
    //   },
    //   signedByDean:{
    //     type:'boolean',
    //     defaultsTo:false,
    //   },
      isActive: {
        type: 'boolean',
        defaultsTo: true,
      },
    
    },
  
    customToJSON() {
      return _.omit(this, ['password']);
    },
  
    countByCriteria(criteria, callback) {
      console.log('====== countByCriteria =======');
      console.log(criteria);
      CourseForm.count(criteria).exec((err, count) => {
        console.log('no of records', count);
        callback(err, count);
      });
    },
    async updateRecord(id, courseFormData, toPush, callback) {
        console.log('update record in model',courseFormData)
        try {
    
          CourseForm.native((err, collection) => {
            collection.findOneAndUpdate(
              { id, isActive: true },
              {
                $push: { timeline: toPush },
                $set: {signedByChair:true},
              }, (error, results) => {
                if (error) return callback(error);
                console.log('******************');
                console.log(results);
                return callback(null, [results.value]);
              },
            );
          });
        } catch (error) {
          Logger.debug(`in catch ${error}`);
          return callback(error);
        }
      },
  
    findByCriteria(criteria, callback) {
      CourseForm.find(criteria).exec((err, data) => {
        console.log('found data', data);
        callback(err, data);
      });
    },
   findActiveByCriteria(criteria, callback) {
      Logger.verbose(criteria);
      CourseForm.findOne(criteria).exec((err, data) => {
        callback(err, data);
      });
    },
    createCourseForm(params, callback) {
        console.log('in courseform moedl',params)
      CourseForm.create(params).fetch().exec((err, data) => {
        callback(err, data);
      });
    },
    findByPagination(criteria, skip, limit, callback) {
      CourseForm.find(criteria).skip(skip).limit(limit).exec((err, data) => {
        callback(err, data);
      });
    },
    findActiveById(id, callback) {
      console.log('id', id);
      CourseForm.findOne(id).exec((err, data) => {
        console.log('data', data);
        callback(err, data);
      });
    },
  
   
    updateActiveById(id, params, callback) {
      console.log('CourseForm at updateActiveById', params)
      console.log('CourseForm at updateActiveById id', id)
  
      CourseForm.update({ id, isActive: true }, params).fetch().exec((err, data) => {
        callback(err, data);
      });
    },
  
    // updateActiveByCriteria(criteria, params, callback) {
    //   CourseForm.update(criteria, params).fetch().exec((err, data) => {
    //     callback(err, data);
    //   });
    //},

    // async findEmailByCriteria(criteria, callback) {
    //   Logger.verbose(criteria)
    //   try {
    //     CourseForm.native((err, collection) => {
    //       console.log(err);
    //       collection.find( criteria,{email:1}).toArray((error, results) => {
    //         if (error) return callback(error);
    //         return callback(null, results);
    //       });
    //     });
    //   } catch (error) {
    //     Logger.debug(`in catch ${error}`);
    //     return callback(error);
    //   }
    // },
    // async findActivesByCriteria(criteria, skip, callback) {
    //   try{
    //   const data = await CourseForm.find({
    //     where: criteria,
    //     limit: sails.config.recordsPerPage,
    //     skip,
    //   }).sort('createdAt DESC');
    //   console.log('****data****')
    //   console.log(data)
    //   return callback(null, data);
    // } catch (error) {
    //   return callback(error);
    // }
    // },
  };
  