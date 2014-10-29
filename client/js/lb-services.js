(function(window, angular, undefined) {'use strict';

var urlBase = "/api";
var authHeader = 'authorization';

/**
 * @ngdoc overview
 * @name lbServices
 * @module
 * @description
 *
 * The `lbServices` module provides services for interacting with
 * the models exposed by the LoopBack server via the REST API.
 *
 */
var module = angular.module("lbServices", ['ngResource']);

/**
 * @ngdoc object
 * @name lbServices.User
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `User` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "User",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Users/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.User#login
         * @methodOf lbServices.User
         *
         * @description
         *
         * Login a user with username/email and password
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
         *   Default value: `user`.
         *
         *  - `rememberMe` - `boolean` - Whether the authentication credentials
         *     should be remembered in localStorage across app/browser restarts.
         *     Default: `true`.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The response body contains properties of the AccessToken created on login.
         * Depending on the value of `include` parameter, the body may contain additional properties:
         * 
         *   - `user` - `{User}` - Data of the currently logged in user. (`include=user`)
         * 
         *
         */
        "login": {
          url: urlBase + "/Users/login",
          method: "POST",
          params: {
            include: "user"
          },
          interceptor: {
            response: function(response) {
              var accessToken = response.data;
              LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
              LoopBackAuth.rememberMe = response.config.params.rememberMe !== false;
              LoopBackAuth.save();
              return response.resource;
            }
          }
        },

        /**
         * @ngdoc method
         * @name lbServices.User#logout
         * @methodOf lbServices.User
         *
         * @description
         *
         * Logout a user with access token
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `access_token` – `{string}` - Do not supply this argument, it is automatically extracted from request headers.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "logout": {
          url: urlBase + "/Users/logout",
          method: "POST",
          interceptor: {
            response: function(response) {
              LoopBackAuth.clearUser();
              LoopBackAuth.save();
              return response.resource;
            }
          }
        },

        /**
         * @ngdoc method
         * @name lbServices.User#confirm
         * @methodOf lbServices.User
         *
         * @description
         *
         * Confirm a user registration with email verification token
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `uid` – `{string}` - 
         *
         *  - `token` – `{string}` - 
         *
         *  - `redirect` – `{string}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "confirm": {
          url: urlBase + "/Users/confirm",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.User#resetPassword
         * @methodOf lbServices.User
         *
         * @description
         *
         * Reset password for a user with email
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "resetPassword": {
          url: urlBase + "/Users/reset",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.User#prototype$__findById__accessTokens
         * @methodOf lbServices.User
         *
         * @description
         *
         * Find a related item by id for accessTokens
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "prototype$__findById__accessTokens": {
          url: urlBase + "/Users/:id/accessTokens/:fk",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.User#prototype$__destroyById__accessTokens
         * @methodOf lbServices.User
         *
         * @description
         *
         * Delete a related item by id for accessTokens
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        "prototype$__destroyById__accessTokens": {
          url: urlBase + "/Users/:id/accessTokens/:fk",
          method: "DELETE",
        },

        /**
         * @ngdoc method
         * @name lbServices.User#prototype$__updateById__accessTokens
         * @methodOf lbServices.User
         *
         * @description
         *
         * Update a related item by id for accessTokens
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "prototype$__updateById__accessTokens": {
          url: urlBase + "/Users/:id/accessTokens/:fk",
          method: "PUT",
        },

        /**
         * @ngdoc method
         * @name lbServices.User#prototype$__get__accessTokens
         * @methodOf lbServices.User
         *
         * @description
         *
         * Queries accessTokens of User.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "prototype$__get__accessTokens": {
          url: urlBase + "/Users/:id/accessTokens",
          method: "GET",
          isArray: true,
        },

        /**
         * @ngdoc method
         * @name lbServices.User#prototype$__create__accessTokens
         * @methodOf lbServices.User
         *
         * @description
         *
         * Creates a new instance in accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "prototype$__create__accessTokens": {
          url: urlBase + "/Users/:id/accessTokens",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.User#prototype$__delete__accessTokens
         * @methodOf lbServices.User
         *
         * @description
         *
         * Deletes all accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__delete__accessTokens": {
          url: urlBase + "/Users/:id/accessTokens",
          method: "DELETE",
        },

        /**
         * @ngdoc method
         * @name lbServices.User#prototype$__count__accessTokens
         * @methodOf lbServices.User
         *
         * @description
         *
         * Counts accessTokens of User.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "prototype$__count__accessTokens": {
          url: urlBase + "/Users/:id/accessTokens/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.User#create
         * @methodOf lbServices.User
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Users",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.User#upsert
         * @methodOf lbServices.User
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Users",
          method: "PUT",
        },

        /**
         * @ngdoc method
         * @name lbServices.User#exists
         * @methodOf lbServices.User
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Users/:id/exists",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.User#findById
         * @methodOf lbServices.User
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Users/:id",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.User#find
         * @methodOf lbServices.User
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "find": {
          url: urlBase + "/Users",
          method: "GET",
          isArray: true,
        },

        /**
         * @ngdoc method
         * @name lbServices.User#findOne
         * @methodOf lbServices.User
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Users/findOne",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.User#updateAll
         * @methodOf lbServices.User
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Users/update",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.User#deleteById
         * @methodOf lbServices.User
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Users/:id",
          method: "DELETE",
        },

        /**
         * @ngdoc method
         * @name lbServices.User#count
         * @methodOf lbServices.User
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Users/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.User#prototype$updateAttributes
         * @methodOf lbServices.User
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Users/:id",
          method: "PUT",
        },

        /**
         * @ngdoc method
         * @name lbServices.User#getCurrent
         * @methodOf lbServices.User
         *
         * @description
         *
         * Get data of the currently logged user. Fail with HTTP result 401
         * when there is no user logged in.
         *
         * @param {Function(Object, Object)=} successCb
         *    Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *    `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         */
        "getCurrent": {
           url: urlBase + "/" + "/Users" + "/:id",
           method: "GET",
           params: {
             id: function() {
              var id = LoopBackAuth.currentUserId;
              if (id == null) id = '__anonymous__';
              return id;
            },
          },
          interceptor: {
            response: function(response) {
              LoopBackAuth.currentUserData = response.data;
              return response.resource;
            }
          },
          __isGetCurrentUser__ : true
        }
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.User#updateOrCreate
         * @methodOf lbServices.User
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.User#update
         * @methodOf lbServices.User
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.User#destroyById
         * @methodOf lbServices.User
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.User#removeById
         * @methodOf lbServices.User
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.User#getCachedCurrent
         * @methodOf lbServices.User
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link lbServices.User#login} or
         * {@link lbServices.User#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @return {Object} A User instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name lbServices.User#isAuthenticated
         * @methodOf lbServices.User
         *
         * @return {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name lbServices.User#getCurrentId
         * @methodOf lbServices.User
         *
         * @return {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };


    /**
    * @ngdoc property
    * @name lbServices.User#modelName
    * @propertyOf lbServices.User
    * @description
    * The name of the model represented by this $resource,
    * i.e. `User`.
    */
    R.modelName = "User";

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Barang
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Barang` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Barang",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Barangs/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Barang.barangMasuk.findById() instead.
        "prototype$__findById__barangMasuk": {
          url: urlBase + "/Barangs/:id/barangMasuk/:fk",
          method: "GET",
        },

        // INTERNAL. Use Barang.barangMasuk.destroyById() instead.
        "prototype$__destroyById__barangMasuk": {
          url: urlBase + "/Barangs/:id/barangMasuk/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Barang.barangMasuk.updateById() instead.
        "prototype$__updateById__barangMasuk": {
          url: urlBase + "/Barangs/:id/barangMasuk/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Barang.kategoriBarang() instead.
        "prototype$__get__kategoriBarang": {
          url: urlBase + "/Barangs/:id/kategoriBarang",
          method: "GET",
        },

        // INTERNAL. Use Barang.permintaanBarang.findById() instead.
        "prototype$__findById__permintaanBarang": {
          url: urlBase + "/Barangs/:id/permintaanBarang/:fk",
          method: "GET",
        },

        // INTERNAL. Use Barang.permintaanBarang.destroyById() instead.
        "prototype$__destroyById__permintaanBarang": {
          url: urlBase + "/Barangs/:id/permintaanBarang/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Barang.permintaanBarang.updateById() instead.
        "prototype$__updateById__permintaanBarang": {
          url: urlBase + "/Barangs/:id/permintaanBarang/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Barang.pindahBarang.findById() instead.
        "prototype$__findById__pindahBarang": {
          url: urlBase + "/Barangs/:id/pindahBarang/:fk",
          method: "GET",
        },

        // INTERNAL. Use Barang.pindahBarang.destroyById() instead.
        "prototype$__destroyById__pindahBarang": {
          url: urlBase + "/Barangs/:id/pindahBarang/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Barang.pindahBarang.updateById() instead.
        "prototype$__updateById__pindahBarang": {
          url: urlBase + "/Barangs/:id/pindahBarang/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Barang.rencanaPembelian.findById() instead.
        "prototype$__findById__rencanaPembelian": {
          url: urlBase + "/Barangs/:id/rencanaPembelian/:fk",
          method: "GET",
        },

        // INTERNAL. Use Barang.rencanaPembelian.destroyById() instead.
        "prototype$__destroyById__rencanaPembelian": {
          url: urlBase + "/Barangs/:id/rencanaPembelian/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Barang.rencanaPembelian.updateById() instead.
        "prototype$__updateById__rencanaPembelian": {
          url: urlBase + "/Barangs/:id/rencanaPembelian/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Barang.barangMasuk() instead.
        "prototype$__get__barangMasuk": {
          url: urlBase + "/Barangs/:id/barangMasuk",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Barang.barangMasuk.create() instead.
        "prototype$__create__barangMasuk": {
          url: urlBase + "/Barangs/:id/barangMasuk",
          method: "POST",
        },

        // INTERNAL. Use Barang.barangMasuk.destroyAll() instead.
        "prototype$__delete__barangMasuk": {
          url: urlBase + "/Barangs/:id/barangMasuk",
          method: "DELETE",
        },

        // INTERNAL. Use Barang.barangMasuk.count() instead.
        "prototype$__count__barangMasuk": {
          url: urlBase + "/Barangs/:id/barangMasuk/count",
          method: "GET",
        },

        // INTERNAL. Use Barang.permintaanBarang() instead.
        "prototype$__get__permintaanBarang": {
          url: urlBase + "/Barangs/:id/permintaanBarang",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Barang.permintaanBarang.create() instead.
        "prototype$__create__permintaanBarang": {
          url: urlBase + "/Barangs/:id/permintaanBarang",
          method: "POST",
        },

        // INTERNAL. Use Barang.permintaanBarang.destroyAll() instead.
        "prototype$__delete__permintaanBarang": {
          url: urlBase + "/Barangs/:id/permintaanBarang",
          method: "DELETE",
        },

        // INTERNAL. Use Barang.permintaanBarang.count() instead.
        "prototype$__count__permintaanBarang": {
          url: urlBase + "/Barangs/:id/permintaanBarang/count",
          method: "GET",
        },

        // INTERNAL. Use Barang.pindahBarang() instead.
        "prototype$__get__pindahBarang": {
          url: urlBase + "/Barangs/:id/pindahBarang",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Barang.pindahBarang.create() instead.
        "prototype$__create__pindahBarang": {
          url: urlBase + "/Barangs/:id/pindahBarang",
          method: "POST",
        },

        // INTERNAL. Use Barang.pindahBarang.destroyAll() instead.
        "prototype$__delete__pindahBarang": {
          url: urlBase + "/Barangs/:id/pindahBarang",
          method: "DELETE",
        },

        // INTERNAL. Use Barang.pindahBarang.count() instead.
        "prototype$__count__pindahBarang": {
          url: urlBase + "/Barangs/:id/pindahBarang/count",
          method: "GET",
        },

        // INTERNAL. Use Barang.rencanaPembelian() instead.
        "prototype$__get__rencanaPembelian": {
          url: urlBase + "/Barangs/:id/rencanaPembelian",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Barang.rencanaPembelian.create() instead.
        "prototype$__create__rencanaPembelian": {
          url: urlBase + "/Barangs/:id/rencanaPembelian",
          method: "POST",
        },

        // INTERNAL. Use Barang.rencanaPembelian.destroyAll() instead.
        "prototype$__delete__rencanaPembelian": {
          url: urlBase + "/Barangs/:id/rencanaPembelian",
          method: "DELETE",
        },

        // INTERNAL. Use Barang.rencanaPembelian.count() instead.
        "prototype$__count__rencanaPembelian": {
          url: urlBase + "/Barangs/:id/rencanaPembelian/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Barang#create
         * @methodOf lbServices.Barang
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Barang` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Barangs",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.Barang#upsert
         * @methodOf lbServices.Barang
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Barang` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Barangs",
          method: "PUT",
        },

        /**
         * @ngdoc method
         * @name lbServices.Barang#exists
         * @methodOf lbServices.Barang
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Barangs/:id/exists",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Barang#findById
         * @methodOf lbServices.Barang
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Barang` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Barangs/:id",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Barang#find
         * @methodOf lbServices.Barang
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Barang` object.)
         * </em>
         */
        "find": {
          url: urlBase + "/Barangs",
          method: "GET",
          isArray: true,
        },

        /**
         * @ngdoc method
         * @name lbServices.Barang#findOne
         * @methodOf lbServices.Barang
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Barang` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Barangs/findOne",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Barang#updateAll
         * @methodOf lbServices.Barang
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Barangs/update",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.Barang#deleteById
         * @methodOf lbServices.Barang
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Barangs/:id",
          method: "DELETE",
        },

        /**
         * @ngdoc method
         * @name lbServices.Barang#count
         * @methodOf lbServices.Barang
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Barangs/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Barang#prototype$updateAttributes
         * @methodOf lbServices.Barang
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Barang` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Barangs/:id",
          method: "PUT",
        },

        // INTERNAL. Use BarangMasuk.barang() instead.
        "::get::BarangMasuk::barang": {
          url: urlBase + "/BarangMasuks/:id/barang",
          method: "GET",
        },

        // INTERNAL. Use KategoriBarang.barang.findById() instead.
        "::findById::KategoriBarang::barang": {
          url: urlBase + "/KategoriBarangs/:id/barang/:fk",
          method: "GET",
        },

        // INTERNAL. Use KategoriBarang.barang.destroyById() instead.
        "::destroyById::KategoriBarang::barang": {
          url: urlBase + "/KategoriBarangs/:id/barang/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use KategoriBarang.barang.updateById() instead.
        "::updateById::KategoriBarang::barang": {
          url: urlBase + "/KategoriBarangs/:id/barang/:fk",
          method: "PUT",
        },

        // INTERNAL. Use KategoriBarang.barang() instead.
        "::get::KategoriBarang::barang": {
          url: urlBase + "/KategoriBarangs/:id/barang",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use KategoriBarang.barang.create() instead.
        "::create::KategoriBarang::barang": {
          url: urlBase + "/KategoriBarangs/:id/barang",
          method: "POST",
        },

        // INTERNAL. Use KategoriBarang.barang.destroyAll() instead.
        "::delete::KategoriBarang::barang": {
          url: urlBase + "/KategoriBarangs/:id/barang",
          method: "DELETE",
        },

        // INTERNAL. Use KategoriBarang.barang.count() instead.
        "::count::KategoriBarang::barang": {
          url: urlBase + "/KategoriBarangs/:id/barang/count",
          method: "GET",
        },

        // INTERNAL. Use PermintaanBarang.barang() instead.
        "::get::PermintaanBarang::barang": {
          url: urlBase + "/PermintaanBarangs/:id/barang",
          method: "GET",
        },

        // INTERNAL. Use PindahBarang.barang() instead.
        "::get::PindahBarang::barang": {
          url: urlBase + "/PindahBarangs/:id/barang",
          method: "GET",
        },

        // INTERNAL. Use RencanaPembelian.barang() instead.
        "::get::RencanaPembelian::barang": {
          url: urlBase + "/RencanaPembelians/:id/barang",
          method: "GET",
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Barang#updateOrCreate
         * @methodOf lbServices.Barang
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Barang` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Barang#update
         * @methodOf lbServices.Barang
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Barang#destroyById
         * @methodOf lbServices.Barang
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Barang#removeById
         * @methodOf lbServices.Barang
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
     * @ngdoc object
     * @name lbServices.Barang.barangMasuk
     * @object
     * @description
     *
     * The object `Barang.barangMasuk` groups methods
     * manipulating `BarangMasuk` instances related to `Barang`.
     *
     * Use {@link lbServices.Barang#barangMasuk} to query
     * all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Barang#barangMasuk
         * @methodOf lbServices.Barang
         *
         * @description
         *
         * Queries barangMasuk of Barang.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BarangMasuk` object.)
         * </em>
         */
        R.barangMasuk = function() {
          var TargetResource = $injector.get("BarangMasuk");
          var action = TargetResource["::get::Barang::barangMasuk"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Barang.barangMasuk#count
         * @methodOf lbServices.Barang.barangMasuk
         *
         * @description
         *
         * Counts barangMasuk of Barang.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.barangMasuk.count = function() {
          var TargetResource = $injector.get("BarangMasuk");
          var action = TargetResource["::count::Barang::barangMasuk"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Barang.barangMasuk#create
         * @methodOf lbServices.Barang.barangMasuk
         *
         * @description
         *
         * Creates a new instance in barangMasuk of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BarangMasuk` object.)
         * </em>
         */
        R.barangMasuk.create = function() {
          var TargetResource = $injector.get("BarangMasuk");
          var action = TargetResource["::create::Barang::barangMasuk"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Barang.barangMasuk#destroyAll
         * @methodOf lbServices.Barang.barangMasuk
         *
         * @description
         *
         * Deletes all barangMasuk of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.barangMasuk.destroyAll = function() {
          var TargetResource = $injector.get("BarangMasuk");
          var action = TargetResource["::delete::Barang::barangMasuk"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Barang.barangMasuk#destroyById
         * @methodOf lbServices.Barang.barangMasuk
         *
         * @description
         *
         * Delete a related item by id for barangMasuk
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for barangMasuk
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.barangMasuk.destroyById = function() {
          var TargetResource = $injector.get("BarangMasuk");
          var action = TargetResource["::destroyById::Barang::barangMasuk"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Barang.barangMasuk#findById
         * @methodOf lbServices.Barang.barangMasuk
         *
         * @description
         *
         * Find a related item by id for barangMasuk
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for barangMasuk
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BarangMasuk` object.)
         * </em>
         */
        R.barangMasuk.findById = function() {
          var TargetResource = $injector.get("BarangMasuk");
          var action = TargetResource["::findById::Barang::barangMasuk"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Barang.barangMasuk#updateById
         * @methodOf lbServices.Barang.barangMasuk
         *
         * @description
         *
         * Update a related item by id for barangMasuk
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for barangMasuk
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BarangMasuk` object.)
         * </em>
         */
        R.barangMasuk.updateById = function() {
          var TargetResource = $injector.get("BarangMasuk");
          var action = TargetResource["::updateById::Barang::barangMasuk"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Barang#kategoriBarang
         * @methodOf lbServices.Barang
         *
         * @description
         *
         * Fetches belongsTo relation kategoriBarang
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KategoriBarang` object.)
         * </em>
         */
        R.kategoriBarang = function() {
          var TargetResource = $injector.get("KategoriBarang");
          var action = TargetResource["::get::Barang::kategoriBarang"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Barang.permintaanBarang
     * @object
     * @description
     *
     * The object `Barang.permintaanBarang` groups methods
     * manipulating `PermintaanBarang` instances related to `Barang`.
     *
     * Use {@link lbServices.Barang#permintaanBarang} to query
     * all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Barang#permintaanBarang
         * @methodOf lbServices.Barang
         *
         * @description
         *
         * Queries permintaanBarang of Barang.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PermintaanBarang` object.)
         * </em>
         */
        R.permintaanBarang = function() {
          var TargetResource = $injector.get("PermintaanBarang");
          var action = TargetResource["::get::Barang::permintaanBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Barang.permintaanBarang#count
         * @methodOf lbServices.Barang.permintaanBarang
         *
         * @description
         *
         * Counts permintaanBarang of Barang.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.permintaanBarang.count = function() {
          var TargetResource = $injector.get("PermintaanBarang");
          var action = TargetResource["::count::Barang::permintaanBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Barang.permintaanBarang#create
         * @methodOf lbServices.Barang.permintaanBarang
         *
         * @description
         *
         * Creates a new instance in permintaanBarang of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PermintaanBarang` object.)
         * </em>
         */
        R.permintaanBarang.create = function() {
          var TargetResource = $injector.get("PermintaanBarang");
          var action = TargetResource["::create::Barang::permintaanBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Barang.permintaanBarang#destroyAll
         * @methodOf lbServices.Barang.permintaanBarang
         *
         * @description
         *
         * Deletes all permintaanBarang of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.permintaanBarang.destroyAll = function() {
          var TargetResource = $injector.get("PermintaanBarang");
          var action = TargetResource["::delete::Barang::permintaanBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Barang.permintaanBarang#destroyById
         * @methodOf lbServices.Barang.permintaanBarang
         *
         * @description
         *
         * Delete a related item by id for permintaanBarang
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for permintaanBarang
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.permintaanBarang.destroyById = function() {
          var TargetResource = $injector.get("PermintaanBarang");
          var action = TargetResource["::destroyById::Barang::permintaanBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Barang.permintaanBarang#findById
         * @methodOf lbServices.Barang.permintaanBarang
         *
         * @description
         *
         * Find a related item by id for permintaanBarang
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for permintaanBarang
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PermintaanBarang` object.)
         * </em>
         */
        R.permintaanBarang.findById = function() {
          var TargetResource = $injector.get("PermintaanBarang");
          var action = TargetResource["::findById::Barang::permintaanBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Barang.permintaanBarang#updateById
         * @methodOf lbServices.Barang.permintaanBarang
         *
         * @description
         *
         * Update a related item by id for permintaanBarang
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for permintaanBarang
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PermintaanBarang` object.)
         * </em>
         */
        R.permintaanBarang.updateById = function() {
          var TargetResource = $injector.get("PermintaanBarang");
          var action = TargetResource["::updateById::Barang::permintaanBarang"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Barang.pindahBarang
     * @object
     * @description
     *
     * The object `Barang.pindahBarang` groups methods
     * manipulating `PindahBarang` instances related to `Barang`.
     *
     * Use {@link lbServices.Barang#pindahBarang} to query
     * all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Barang#pindahBarang
         * @methodOf lbServices.Barang
         *
         * @description
         *
         * Queries pindahBarang of Barang.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PindahBarang` object.)
         * </em>
         */
        R.pindahBarang = function() {
          var TargetResource = $injector.get("PindahBarang");
          var action = TargetResource["::get::Barang::pindahBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Barang.pindahBarang#count
         * @methodOf lbServices.Barang.pindahBarang
         *
         * @description
         *
         * Counts pindahBarang of Barang.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.pindahBarang.count = function() {
          var TargetResource = $injector.get("PindahBarang");
          var action = TargetResource["::count::Barang::pindahBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Barang.pindahBarang#create
         * @methodOf lbServices.Barang.pindahBarang
         *
         * @description
         *
         * Creates a new instance in pindahBarang of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PindahBarang` object.)
         * </em>
         */
        R.pindahBarang.create = function() {
          var TargetResource = $injector.get("PindahBarang");
          var action = TargetResource["::create::Barang::pindahBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Barang.pindahBarang#destroyAll
         * @methodOf lbServices.Barang.pindahBarang
         *
         * @description
         *
         * Deletes all pindahBarang of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.pindahBarang.destroyAll = function() {
          var TargetResource = $injector.get("PindahBarang");
          var action = TargetResource["::delete::Barang::pindahBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Barang.pindahBarang#destroyById
         * @methodOf lbServices.Barang.pindahBarang
         *
         * @description
         *
         * Delete a related item by id for pindahBarang
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for pindahBarang
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.pindahBarang.destroyById = function() {
          var TargetResource = $injector.get("PindahBarang");
          var action = TargetResource["::destroyById::Barang::pindahBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Barang.pindahBarang#findById
         * @methodOf lbServices.Barang.pindahBarang
         *
         * @description
         *
         * Find a related item by id for pindahBarang
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for pindahBarang
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PindahBarang` object.)
         * </em>
         */
        R.pindahBarang.findById = function() {
          var TargetResource = $injector.get("PindahBarang");
          var action = TargetResource["::findById::Barang::pindahBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Barang.pindahBarang#updateById
         * @methodOf lbServices.Barang.pindahBarang
         *
         * @description
         *
         * Update a related item by id for pindahBarang
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for pindahBarang
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PindahBarang` object.)
         * </em>
         */
        R.pindahBarang.updateById = function() {
          var TargetResource = $injector.get("PindahBarang");
          var action = TargetResource["::updateById::Barang::pindahBarang"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Barang.rencanaPembelian
     * @object
     * @description
     *
     * The object `Barang.rencanaPembelian` groups methods
     * manipulating `RencanaPembelian` instances related to `Barang`.
     *
     * Use {@link lbServices.Barang#rencanaPembelian} to query
     * all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Barang#rencanaPembelian
         * @methodOf lbServices.Barang
         *
         * @description
         *
         * Queries rencanaPembelian of Barang.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `RencanaPembelian` object.)
         * </em>
         */
        R.rencanaPembelian = function() {
          var TargetResource = $injector.get("RencanaPembelian");
          var action = TargetResource["::get::Barang::rencanaPembelian"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Barang.rencanaPembelian#count
         * @methodOf lbServices.Barang.rencanaPembelian
         *
         * @description
         *
         * Counts rencanaPembelian of Barang.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.rencanaPembelian.count = function() {
          var TargetResource = $injector.get("RencanaPembelian");
          var action = TargetResource["::count::Barang::rencanaPembelian"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Barang.rencanaPembelian#create
         * @methodOf lbServices.Barang.rencanaPembelian
         *
         * @description
         *
         * Creates a new instance in rencanaPembelian of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `RencanaPembelian` object.)
         * </em>
         */
        R.rencanaPembelian.create = function() {
          var TargetResource = $injector.get("RencanaPembelian");
          var action = TargetResource["::create::Barang::rencanaPembelian"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Barang.rencanaPembelian#destroyAll
         * @methodOf lbServices.Barang.rencanaPembelian
         *
         * @description
         *
         * Deletes all rencanaPembelian of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.rencanaPembelian.destroyAll = function() {
          var TargetResource = $injector.get("RencanaPembelian");
          var action = TargetResource["::delete::Barang::rencanaPembelian"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Barang.rencanaPembelian#destroyById
         * @methodOf lbServices.Barang.rencanaPembelian
         *
         * @description
         *
         * Delete a related item by id for rencanaPembelian
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for rencanaPembelian
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.rencanaPembelian.destroyById = function() {
          var TargetResource = $injector.get("RencanaPembelian");
          var action = TargetResource["::destroyById::Barang::rencanaPembelian"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Barang.rencanaPembelian#findById
         * @methodOf lbServices.Barang.rencanaPembelian
         *
         * @description
         *
         * Find a related item by id for rencanaPembelian
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for rencanaPembelian
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `RencanaPembelian` object.)
         * </em>
         */
        R.rencanaPembelian.findById = function() {
          var TargetResource = $injector.get("RencanaPembelian");
          var action = TargetResource["::findById::Barang::rencanaPembelian"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Barang.rencanaPembelian#updateById
         * @methodOf lbServices.Barang.rencanaPembelian
         *
         * @description
         *
         * Update a related item by id for rencanaPembelian
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for rencanaPembelian
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `RencanaPembelian` object.)
         * </em>
         */
        R.rencanaPembelian.updateById = function() {
          var TargetResource = $injector.get("RencanaPembelian");
          var action = TargetResource["::updateById::Barang::rencanaPembelian"];
          return action.apply(R, arguments);
        };

    /**
    * @ngdoc property
    * @name lbServices.Barang#modelName
    * @propertyOf lbServices.Barang
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Barang`.
    */
    R.modelName = "Barang";

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.BarangMasuk
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `BarangMasuk` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "BarangMasuk",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/BarangMasuks/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use BarangMasuk.barang() instead.
        "prototype$__get__barang": {
          url: urlBase + "/BarangMasuks/:id/barang",
          method: "GET",
        },

        // INTERNAL. Use BarangMasuk.lokasi() instead.
        "prototype$__get__lokasi": {
          url: urlBase + "/BarangMasuks/:id/lokasi",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.BarangMasuk#create
         * @methodOf lbServices.BarangMasuk
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BarangMasuk` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/BarangMasuks",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.BarangMasuk#upsert
         * @methodOf lbServices.BarangMasuk
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BarangMasuk` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/BarangMasuks",
          method: "PUT",
        },

        /**
         * @ngdoc method
         * @name lbServices.BarangMasuk#exists
         * @methodOf lbServices.BarangMasuk
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/BarangMasuks/:id/exists",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.BarangMasuk#findById
         * @methodOf lbServices.BarangMasuk
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BarangMasuk` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/BarangMasuks/:id",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.BarangMasuk#find
         * @methodOf lbServices.BarangMasuk
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BarangMasuk` object.)
         * </em>
         */
        "find": {
          url: urlBase + "/BarangMasuks",
          method: "GET",
          isArray: true,
        },

        /**
         * @ngdoc method
         * @name lbServices.BarangMasuk#findOne
         * @methodOf lbServices.BarangMasuk
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BarangMasuk` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/BarangMasuks/findOne",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.BarangMasuk#updateAll
         * @methodOf lbServices.BarangMasuk
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/BarangMasuks/update",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.BarangMasuk#deleteById
         * @methodOf lbServices.BarangMasuk
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/BarangMasuks/:id",
          method: "DELETE",
        },

        /**
         * @ngdoc method
         * @name lbServices.BarangMasuk#count
         * @methodOf lbServices.BarangMasuk
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/BarangMasuks/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.BarangMasuk#prototype$updateAttributes
         * @methodOf lbServices.BarangMasuk
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BarangMasuk` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/BarangMasuks/:id",
          method: "PUT",
        },

        // INTERNAL. Use Barang.barangMasuk.findById() instead.
        "::findById::Barang::barangMasuk": {
          url: urlBase + "/Barangs/:id/barangMasuk/:fk",
          method: "GET",
        },

        // INTERNAL. Use Barang.barangMasuk.destroyById() instead.
        "::destroyById::Barang::barangMasuk": {
          url: urlBase + "/Barangs/:id/barangMasuk/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Barang.barangMasuk.updateById() instead.
        "::updateById::Barang::barangMasuk": {
          url: urlBase + "/Barangs/:id/barangMasuk/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Barang.barangMasuk() instead.
        "::get::Barang::barangMasuk": {
          url: urlBase + "/Barangs/:id/barangMasuk",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Barang.barangMasuk.create() instead.
        "::create::Barang::barangMasuk": {
          url: urlBase + "/Barangs/:id/barangMasuk",
          method: "POST",
        },

        // INTERNAL. Use Barang.barangMasuk.destroyAll() instead.
        "::delete::Barang::barangMasuk": {
          url: urlBase + "/Barangs/:id/barangMasuk",
          method: "DELETE",
        },

        // INTERNAL. Use Barang.barangMasuk.count() instead.
        "::count::Barang::barangMasuk": {
          url: urlBase + "/Barangs/:id/barangMasuk/count",
          method: "GET",
        },

        // INTERNAL. Use Lokasi.barangMasuk.findById() instead.
        "::findById::Lokasi::barangMasuk": {
          url: urlBase + "/Lokasis/:id/barangMasuk/:fk",
          method: "GET",
        },

        // INTERNAL. Use Lokasi.barangMasuk.destroyById() instead.
        "::destroyById::Lokasi::barangMasuk": {
          url: urlBase + "/Lokasis/:id/barangMasuk/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Lokasi.barangMasuk.updateById() instead.
        "::updateById::Lokasi::barangMasuk": {
          url: urlBase + "/Lokasis/:id/barangMasuk/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Lokasi.barangMasuk() instead.
        "::get::Lokasi::barangMasuk": {
          url: urlBase + "/Lokasis/:id/barangMasuk",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Lokasi.barangMasuk.create() instead.
        "::create::Lokasi::barangMasuk": {
          url: urlBase + "/Lokasis/:id/barangMasuk",
          method: "POST",
        },

        // INTERNAL. Use Lokasi.barangMasuk.destroyAll() instead.
        "::delete::Lokasi::barangMasuk": {
          url: urlBase + "/Lokasis/:id/barangMasuk",
          method: "DELETE",
        },

        // INTERNAL. Use Lokasi.barangMasuk.count() instead.
        "::count::Lokasi::barangMasuk": {
          url: urlBase + "/Lokasis/:id/barangMasuk/count",
          method: "GET",
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.BarangMasuk#updateOrCreate
         * @methodOf lbServices.BarangMasuk
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BarangMasuk` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.BarangMasuk#update
         * @methodOf lbServices.BarangMasuk
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.BarangMasuk#destroyById
         * @methodOf lbServices.BarangMasuk
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.BarangMasuk#removeById
         * @methodOf lbServices.BarangMasuk
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];



        /**
         * @ngdoc method
         * @name lbServices.BarangMasuk#barang
         * @methodOf lbServices.BarangMasuk
         *
         * @description
         *
         * Fetches belongsTo relation barang
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Barang` object.)
         * </em>
         */
        R.barang = function() {
          var TargetResource = $injector.get("Barang");
          var action = TargetResource["::get::BarangMasuk::barang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.BarangMasuk#lokasi
         * @methodOf lbServices.BarangMasuk
         *
         * @description
         *
         * Fetches belongsTo relation lokasi
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Lokasi` object.)
         * </em>
         */
        R.lokasi = function() {
          var TargetResource = $injector.get("Lokasi");
          var action = TargetResource["::get::BarangMasuk::lokasi"];
          return action.apply(R, arguments);
        };

    /**
    * @ngdoc property
    * @name lbServices.BarangMasuk#modelName
    * @propertyOf lbServices.BarangMasuk
    * @description
    * The name of the model represented by this $resource,
    * i.e. `BarangMasuk`.
    */
    R.modelName = "BarangMasuk";

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.KategoriBarang
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `KategoriBarang` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "KategoriBarang",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/KategoriBarangs/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use KategoriBarang.barang.findById() instead.
        "prototype$__findById__barang": {
          url: urlBase + "/KategoriBarangs/:id/barang/:fk",
          method: "GET",
        },

        // INTERNAL. Use KategoriBarang.barang.destroyById() instead.
        "prototype$__destroyById__barang": {
          url: urlBase + "/KategoriBarangs/:id/barang/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use KategoriBarang.barang.updateById() instead.
        "prototype$__updateById__barang": {
          url: urlBase + "/KategoriBarangs/:id/barang/:fk",
          method: "PUT",
        },

        // INTERNAL. Use KategoriBarang.barang() instead.
        "prototype$__get__barang": {
          url: urlBase + "/KategoriBarangs/:id/barang",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use KategoriBarang.barang.create() instead.
        "prototype$__create__barang": {
          url: urlBase + "/KategoriBarangs/:id/barang",
          method: "POST",
        },

        // INTERNAL. Use KategoriBarang.barang.destroyAll() instead.
        "prototype$__delete__barang": {
          url: urlBase + "/KategoriBarangs/:id/barang",
          method: "DELETE",
        },

        // INTERNAL. Use KategoriBarang.barang.count() instead.
        "prototype$__count__barang": {
          url: urlBase + "/KategoriBarangs/:id/barang/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.KategoriBarang#create
         * @methodOf lbServices.KategoriBarang
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KategoriBarang` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/KategoriBarangs",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.KategoriBarang#upsert
         * @methodOf lbServices.KategoriBarang
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KategoriBarang` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/KategoriBarangs",
          method: "PUT",
        },

        /**
         * @ngdoc method
         * @name lbServices.KategoriBarang#exists
         * @methodOf lbServices.KategoriBarang
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/KategoriBarangs/:id/exists",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.KategoriBarang#findById
         * @methodOf lbServices.KategoriBarang
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KategoriBarang` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/KategoriBarangs/:id",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.KategoriBarang#find
         * @methodOf lbServices.KategoriBarang
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KategoriBarang` object.)
         * </em>
         */
        "find": {
          url: urlBase + "/KategoriBarangs",
          method: "GET",
          isArray: true,
        },

        /**
         * @ngdoc method
         * @name lbServices.KategoriBarang#findOne
         * @methodOf lbServices.KategoriBarang
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KategoriBarang` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/KategoriBarangs/findOne",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.KategoriBarang#updateAll
         * @methodOf lbServices.KategoriBarang
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/KategoriBarangs/update",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.KategoriBarang#deleteById
         * @methodOf lbServices.KategoriBarang
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/KategoriBarangs/:id",
          method: "DELETE",
        },

        /**
         * @ngdoc method
         * @name lbServices.KategoriBarang#count
         * @methodOf lbServices.KategoriBarang
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/KategoriBarangs/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.KategoriBarang#prototype$updateAttributes
         * @methodOf lbServices.KategoriBarang
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KategoriBarang` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/KategoriBarangs/:id",
          method: "PUT",
        },

        // INTERNAL. Use Barang.kategoriBarang() instead.
        "::get::Barang::kategoriBarang": {
          url: urlBase + "/Barangs/:id/kategoriBarang",
          method: "GET",
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.KategoriBarang#updateOrCreate
         * @methodOf lbServices.KategoriBarang
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KategoriBarang` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.KategoriBarang#update
         * @methodOf lbServices.KategoriBarang
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.KategoriBarang#destroyById
         * @methodOf lbServices.KategoriBarang
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.KategoriBarang#removeById
         * @methodOf lbServices.KategoriBarang
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
     * @ngdoc object
     * @name lbServices.KategoriBarang.barang
     * @object
     * @description
     *
     * The object `KategoriBarang.barang` groups methods
     * manipulating `Barang` instances related to `KategoriBarang`.
     *
     * Use {@link lbServices.KategoriBarang#barang} to query
     * all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.KategoriBarang#barang
         * @methodOf lbServices.KategoriBarang
         *
         * @description
         *
         * Queries barang of KategoriBarang.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Barang` object.)
         * </em>
         */
        R.barang = function() {
          var TargetResource = $injector.get("Barang");
          var action = TargetResource["::get::KategoriBarang::barang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.KategoriBarang.barang#count
         * @methodOf lbServices.KategoriBarang.barang
         *
         * @description
         *
         * Counts barang of KategoriBarang.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.barang.count = function() {
          var TargetResource = $injector.get("Barang");
          var action = TargetResource["::count::KategoriBarang::barang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.KategoriBarang.barang#create
         * @methodOf lbServices.KategoriBarang.barang
         *
         * @description
         *
         * Creates a new instance in barang of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Barang` object.)
         * </em>
         */
        R.barang.create = function() {
          var TargetResource = $injector.get("Barang");
          var action = TargetResource["::create::KategoriBarang::barang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.KategoriBarang.barang#destroyAll
         * @methodOf lbServices.KategoriBarang.barang
         *
         * @description
         *
         * Deletes all barang of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.barang.destroyAll = function() {
          var TargetResource = $injector.get("Barang");
          var action = TargetResource["::delete::KategoriBarang::barang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.KategoriBarang.barang#destroyById
         * @methodOf lbServices.KategoriBarang.barang
         *
         * @description
         *
         * Delete a related item by id for barang
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for barang
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.barang.destroyById = function() {
          var TargetResource = $injector.get("Barang");
          var action = TargetResource["::destroyById::KategoriBarang::barang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.KategoriBarang.barang#findById
         * @methodOf lbServices.KategoriBarang.barang
         *
         * @description
         *
         * Find a related item by id for barang
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for barang
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Barang` object.)
         * </em>
         */
        R.barang.findById = function() {
          var TargetResource = $injector.get("Barang");
          var action = TargetResource["::findById::KategoriBarang::barang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.KategoriBarang.barang#updateById
         * @methodOf lbServices.KategoriBarang.barang
         *
         * @description
         *
         * Update a related item by id for barang
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for barang
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Barang` object.)
         * </em>
         */
        R.barang.updateById = function() {
          var TargetResource = $injector.get("Barang");
          var action = TargetResource["::updateById::KategoriBarang::barang"];
          return action.apply(R, arguments);
        };

    /**
    * @ngdoc property
    * @name lbServices.KategoriBarang#modelName
    * @propertyOf lbServices.KategoriBarang
    * @description
    * The name of the model represented by this $resource,
    * i.e. `KategoriBarang`.
    */
    R.modelName = "KategoriBarang";

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Lokasi
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Lokasi` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Lokasi",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Lokasis/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Lokasi.barangMasuk.findById() instead.
        "prototype$__findById__barangMasuk": {
          url: urlBase + "/Lokasis/:id/barangMasuk/:fk",
          method: "GET",
        },

        // INTERNAL. Use Lokasi.barangMasuk.destroyById() instead.
        "prototype$__destroyById__barangMasuk": {
          url: urlBase + "/Lokasis/:id/barangMasuk/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Lokasi.barangMasuk.updateById() instead.
        "prototype$__updateById__barangMasuk": {
          url: urlBase + "/Lokasis/:id/barangMasuk/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Lokasi.permintaanBarang.findById() instead.
        "prototype$__findById__permintaanBarang": {
          url: urlBase + "/Lokasis/:id/permintaanBarang/:fk",
          method: "GET",
        },

        // INTERNAL. Use Lokasi.permintaanBarang.destroyById() instead.
        "prototype$__destroyById__permintaanBarang": {
          url: urlBase + "/Lokasis/:id/permintaanBarang/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Lokasi.permintaanBarang.updateById() instead.
        "prototype$__updateById__permintaanBarang": {
          url: urlBase + "/Lokasis/:id/permintaanBarang/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Lokasi.pindahBarang.findById() instead.
        "prototype$__findById__pindahBarang": {
          url: urlBase + "/Lokasis/:id/pindahBarang/:fk",
          method: "GET",
        },

        // INTERNAL. Use Lokasi.pindahBarang.destroyById() instead.
        "prototype$__destroyById__pindahBarang": {
          url: urlBase + "/Lokasis/:id/pindahBarang/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Lokasi.pindahBarang.updateById() instead.
        "prototype$__updateById__pindahBarang": {
          url: urlBase + "/Lokasis/:id/pindahBarang/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Lokasi.barangMasuk() instead.
        "prototype$__get__barangMasuk": {
          url: urlBase + "/Lokasis/:id/barangMasuk",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Lokasi.barangMasuk.create() instead.
        "prototype$__create__barangMasuk": {
          url: urlBase + "/Lokasis/:id/barangMasuk",
          method: "POST",
        },

        // INTERNAL. Use Lokasi.barangMasuk.destroyAll() instead.
        "prototype$__delete__barangMasuk": {
          url: urlBase + "/Lokasis/:id/barangMasuk",
          method: "DELETE",
        },

        // INTERNAL. Use Lokasi.barangMasuk.count() instead.
        "prototype$__count__barangMasuk": {
          url: urlBase + "/Lokasis/:id/barangMasuk/count",
          method: "GET",
        },

        // INTERNAL. Use Lokasi.permintaanBarang() instead.
        "prototype$__get__permintaanBarang": {
          url: urlBase + "/Lokasis/:id/permintaanBarang",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Lokasi.permintaanBarang.create() instead.
        "prototype$__create__permintaanBarang": {
          url: urlBase + "/Lokasis/:id/permintaanBarang",
          method: "POST",
        },

        // INTERNAL. Use Lokasi.permintaanBarang.destroyAll() instead.
        "prototype$__delete__permintaanBarang": {
          url: urlBase + "/Lokasis/:id/permintaanBarang",
          method: "DELETE",
        },

        // INTERNAL. Use Lokasi.permintaanBarang.count() instead.
        "prototype$__count__permintaanBarang": {
          url: urlBase + "/Lokasis/:id/permintaanBarang/count",
          method: "GET",
        },

        // INTERNAL. Use Lokasi.pindahBarang() instead.
        "prototype$__get__pindahBarang": {
          url: urlBase + "/Lokasis/:id/pindahBarang",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Lokasi.pindahBarang.create() instead.
        "prototype$__create__pindahBarang": {
          url: urlBase + "/Lokasis/:id/pindahBarang",
          method: "POST",
        },

        // INTERNAL. Use Lokasi.pindahBarang.destroyAll() instead.
        "prototype$__delete__pindahBarang": {
          url: urlBase + "/Lokasis/:id/pindahBarang",
          method: "DELETE",
        },

        // INTERNAL. Use Lokasi.pindahBarang.count() instead.
        "prototype$__count__pindahBarang": {
          url: urlBase + "/Lokasis/:id/pindahBarang/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Lokasi#create
         * @methodOf lbServices.Lokasi
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Lokasi` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Lokasis",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.Lokasi#upsert
         * @methodOf lbServices.Lokasi
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Lokasi` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Lokasis",
          method: "PUT",
        },

        /**
         * @ngdoc method
         * @name lbServices.Lokasi#exists
         * @methodOf lbServices.Lokasi
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Lokasis/:id/exists",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Lokasi#findById
         * @methodOf lbServices.Lokasi
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Lokasi` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Lokasis/:id",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Lokasi#find
         * @methodOf lbServices.Lokasi
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Lokasi` object.)
         * </em>
         */
        "find": {
          url: urlBase + "/Lokasis",
          method: "GET",
          isArray: true,
        },

        /**
         * @ngdoc method
         * @name lbServices.Lokasi#findOne
         * @methodOf lbServices.Lokasi
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Lokasi` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Lokasis/findOne",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Lokasi#updateAll
         * @methodOf lbServices.Lokasi
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Lokasis/update",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.Lokasi#deleteById
         * @methodOf lbServices.Lokasi
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Lokasis/:id",
          method: "DELETE",
        },

        /**
         * @ngdoc method
         * @name lbServices.Lokasi#count
         * @methodOf lbServices.Lokasi
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Lokasis/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Lokasi#prototype$updateAttributes
         * @methodOf lbServices.Lokasi
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Lokasi` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Lokasis/:id",
          method: "PUT",
        },

        // INTERNAL. Use BarangMasuk.lokasi() instead.
        "::get::BarangMasuk::lokasi": {
          url: urlBase + "/BarangMasuks/:id/lokasi",
          method: "GET",
        },

        // INTERNAL. Use PermintaanBarang.lokasi() instead.
        "::get::PermintaanBarang::lokasi": {
          url: urlBase + "/PermintaanBarangs/:id/lokasi",
          method: "GET",
        },

        // INTERNAL. Use PindahBarang.dariLokasi() instead.
        "::get::PindahBarang::dariLokasi": {
          url: urlBase + "/PindahBarangs/:id/dariLokasi",
          method: "GET",
        },

        // INTERNAL. Use PindahBarang.keLokasi() instead.
        "::get::PindahBarang::keLokasi": {
          url: urlBase + "/PindahBarangs/:id/keLokasi",
          method: "GET",
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Lokasi#updateOrCreate
         * @methodOf lbServices.Lokasi
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Lokasi` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Lokasi#update
         * @methodOf lbServices.Lokasi
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Lokasi#destroyById
         * @methodOf lbServices.Lokasi
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Lokasi#removeById
         * @methodOf lbServices.Lokasi
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
     * @ngdoc object
     * @name lbServices.Lokasi.barangMasuk
     * @object
     * @description
     *
     * The object `Lokasi.barangMasuk` groups methods
     * manipulating `BarangMasuk` instances related to `Lokasi`.
     *
     * Use {@link lbServices.Lokasi#barangMasuk} to query
     * all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Lokasi#barangMasuk
         * @methodOf lbServices.Lokasi
         *
         * @description
         *
         * Queries barangMasuk of Lokasi.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BarangMasuk` object.)
         * </em>
         */
        R.barangMasuk = function() {
          var TargetResource = $injector.get("BarangMasuk");
          var action = TargetResource["::get::Lokasi::barangMasuk"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Lokasi.barangMasuk#count
         * @methodOf lbServices.Lokasi.barangMasuk
         *
         * @description
         *
         * Counts barangMasuk of Lokasi.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.barangMasuk.count = function() {
          var TargetResource = $injector.get("BarangMasuk");
          var action = TargetResource["::count::Lokasi::barangMasuk"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Lokasi.barangMasuk#create
         * @methodOf lbServices.Lokasi.barangMasuk
         *
         * @description
         *
         * Creates a new instance in barangMasuk of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BarangMasuk` object.)
         * </em>
         */
        R.barangMasuk.create = function() {
          var TargetResource = $injector.get("BarangMasuk");
          var action = TargetResource["::create::Lokasi::barangMasuk"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Lokasi.barangMasuk#destroyAll
         * @methodOf lbServices.Lokasi.barangMasuk
         *
         * @description
         *
         * Deletes all barangMasuk of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.barangMasuk.destroyAll = function() {
          var TargetResource = $injector.get("BarangMasuk");
          var action = TargetResource["::delete::Lokasi::barangMasuk"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Lokasi.barangMasuk#destroyById
         * @methodOf lbServices.Lokasi.barangMasuk
         *
         * @description
         *
         * Delete a related item by id for barangMasuk
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for barangMasuk
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.barangMasuk.destroyById = function() {
          var TargetResource = $injector.get("BarangMasuk");
          var action = TargetResource["::destroyById::Lokasi::barangMasuk"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Lokasi.barangMasuk#findById
         * @methodOf lbServices.Lokasi.barangMasuk
         *
         * @description
         *
         * Find a related item by id for barangMasuk
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for barangMasuk
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BarangMasuk` object.)
         * </em>
         */
        R.barangMasuk.findById = function() {
          var TargetResource = $injector.get("BarangMasuk");
          var action = TargetResource["::findById::Lokasi::barangMasuk"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Lokasi.barangMasuk#updateById
         * @methodOf lbServices.Lokasi.barangMasuk
         *
         * @description
         *
         * Update a related item by id for barangMasuk
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for barangMasuk
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BarangMasuk` object.)
         * </em>
         */
        R.barangMasuk.updateById = function() {
          var TargetResource = $injector.get("BarangMasuk");
          var action = TargetResource["::updateById::Lokasi::barangMasuk"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Lokasi.permintaanBarang
     * @object
     * @description
     *
     * The object `Lokasi.permintaanBarang` groups methods
     * manipulating `PermintaanBarang` instances related to `Lokasi`.
     *
     * Use {@link lbServices.Lokasi#permintaanBarang} to query
     * all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Lokasi#permintaanBarang
         * @methodOf lbServices.Lokasi
         *
         * @description
         *
         * Queries permintaanBarang of Lokasi.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PermintaanBarang` object.)
         * </em>
         */
        R.permintaanBarang = function() {
          var TargetResource = $injector.get("PermintaanBarang");
          var action = TargetResource["::get::Lokasi::permintaanBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Lokasi.permintaanBarang#count
         * @methodOf lbServices.Lokasi.permintaanBarang
         *
         * @description
         *
         * Counts permintaanBarang of Lokasi.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.permintaanBarang.count = function() {
          var TargetResource = $injector.get("PermintaanBarang");
          var action = TargetResource["::count::Lokasi::permintaanBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Lokasi.permintaanBarang#create
         * @methodOf lbServices.Lokasi.permintaanBarang
         *
         * @description
         *
         * Creates a new instance in permintaanBarang of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PermintaanBarang` object.)
         * </em>
         */
        R.permintaanBarang.create = function() {
          var TargetResource = $injector.get("PermintaanBarang");
          var action = TargetResource["::create::Lokasi::permintaanBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Lokasi.permintaanBarang#destroyAll
         * @methodOf lbServices.Lokasi.permintaanBarang
         *
         * @description
         *
         * Deletes all permintaanBarang of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.permintaanBarang.destroyAll = function() {
          var TargetResource = $injector.get("PermintaanBarang");
          var action = TargetResource["::delete::Lokasi::permintaanBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Lokasi.permintaanBarang#destroyById
         * @methodOf lbServices.Lokasi.permintaanBarang
         *
         * @description
         *
         * Delete a related item by id for permintaanBarang
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for permintaanBarang
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.permintaanBarang.destroyById = function() {
          var TargetResource = $injector.get("PermintaanBarang");
          var action = TargetResource["::destroyById::Lokasi::permintaanBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Lokasi.permintaanBarang#findById
         * @methodOf lbServices.Lokasi.permintaanBarang
         *
         * @description
         *
         * Find a related item by id for permintaanBarang
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for permintaanBarang
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PermintaanBarang` object.)
         * </em>
         */
        R.permintaanBarang.findById = function() {
          var TargetResource = $injector.get("PermintaanBarang");
          var action = TargetResource["::findById::Lokasi::permintaanBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Lokasi.permintaanBarang#updateById
         * @methodOf lbServices.Lokasi.permintaanBarang
         *
         * @description
         *
         * Update a related item by id for permintaanBarang
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for permintaanBarang
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PermintaanBarang` object.)
         * </em>
         */
        R.permintaanBarang.updateById = function() {
          var TargetResource = $injector.get("PermintaanBarang");
          var action = TargetResource["::updateById::Lokasi::permintaanBarang"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Lokasi.pindahBarang
     * @object
     * @description
     *
     * The object `Lokasi.pindahBarang` groups methods
     * manipulating `PindahBarang` instances related to `Lokasi`.
     *
     * Use {@link lbServices.Lokasi#pindahBarang} to query
     * all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Lokasi#pindahBarang
         * @methodOf lbServices.Lokasi
         *
         * @description
         *
         * Queries pindahBarang of Lokasi.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PindahBarang` object.)
         * </em>
         */
        R.pindahBarang = function() {
          var TargetResource = $injector.get("PindahBarang");
          var action = TargetResource["::get::Lokasi::pindahBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Lokasi.pindahBarang#count
         * @methodOf lbServices.Lokasi.pindahBarang
         *
         * @description
         *
         * Counts pindahBarang of Lokasi.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.pindahBarang.count = function() {
          var TargetResource = $injector.get("PindahBarang");
          var action = TargetResource["::count::Lokasi::pindahBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Lokasi.pindahBarang#create
         * @methodOf lbServices.Lokasi.pindahBarang
         *
         * @description
         *
         * Creates a new instance in pindahBarang of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PindahBarang` object.)
         * </em>
         */
        R.pindahBarang.create = function() {
          var TargetResource = $injector.get("PindahBarang");
          var action = TargetResource["::create::Lokasi::pindahBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Lokasi.pindahBarang#destroyAll
         * @methodOf lbServices.Lokasi.pindahBarang
         *
         * @description
         *
         * Deletes all pindahBarang of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.pindahBarang.destroyAll = function() {
          var TargetResource = $injector.get("PindahBarang");
          var action = TargetResource["::delete::Lokasi::pindahBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Lokasi.pindahBarang#destroyById
         * @methodOf lbServices.Lokasi.pindahBarang
         *
         * @description
         *
         * Delete a related item by id for pindahBarang
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for pindahBarang
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.pindahBarang.destroyById = function() {
          var TargetResource = $injector.get("PindahBarang");
          var action = TargetResource["::destroyById::Lokasi::pindahBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Lokasi.pindahBarang#findById
         * @methodOf lbServices.Lokasi.pindahBarang
         *
         * @description
         *
         * Find a related item by id for pindahBarang
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for pindahBarang
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PindahBarang` object.)
         * </em>
         */
        R.pindahBarang.findById = function() {
          var TargetResource = $injector.get("PindahBarang");
          var action = TargetResource["::findById::Lokasi::pindahBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Lokasi.pindahBarang#updateById
         * @methodOf lbServices.Lokasi.pindahBarang
         *
         * @description
         *
         * Update a related item by id for pindahBarang
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for pindahBarang
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PindahBarang` object.)
         * </em>
         */
        R.pindahBarang.updateById = function() {
          var TargetResource = $injector.get("PindahBarang");
          var action = TargetResource["::updateById::Lokasi::pindahBarang"];
          return action.apply(R, arguments);
        };

    /**
    * @ngdoc property
    * @name lbServices.Lokasi#modelName
    * @propertyOf lbServices.Lokasi
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Lokasi`.
    */
    R.modelName = "Lokasi";

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.PermintaanBarang
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `PermintaanBarang` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "PermintaanBarang",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/PermintaanBarangs/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use PermintaanBarang.barang() instead.
        "prototype$__get__barang": {
          url: urlBase + "/PermintaanBarangs/:id/barang",
          method: "GET",
        },

        // INTERNAL. Use PermintaanBarang.lokasi() instead.
        "prototype$__get__lokasi": {
          url: urlBase + "/PermintaanBarangs/:id/lokasi",
          method: "GET",
        },

        // INTERNAL. Use PermintaanBarang.pindahBarang() instead.
        "prototype$__get__pindahBarang": {
          url: urlBase + "/PermintaanBarangs/:id/pindahBarang",
          method: "GET",
        },

        // INTERNAL. Use PermintaanBarang.rencanaPembelian() instead.
        "prototype$__get__rencanaPembelian": {
          url: urlBase + "/PermintaanBarangs/:id/rencanaPembelian",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.PermintaanBarang#create
         * @methodOf lbServices.PermintaanBarang
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PermintaanBarang` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/PermintaanBarangs",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.PermintaanBarang#upsert
         * @methodOf lbServices.PermintaanBarang
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PermintaanBarang` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/PermintaanBarangs",
          method: "PUT",
        },

        /**
         * @ngdoc method
         * @name lbServices.PermintaanBarang#exists
         * @methodOf lbServices.PermintaanBarang
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/PermintaanBarangs/:id/exists",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.PermintaanBarang#findById
         * @methodOf lbServices.PermintaanBarang
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PermintaanBarang` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/PermintaanBarangs/:id",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.PermintaanBarang#find
         * @methodOf lbServices.PermintaanBarang
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PermintaanBarang` object.)
         * </em>
         */
        "find": {
          url: urlBase + "/PermintaanBarangs",
          method: "GET",
          isArray: true,
        },

        /**
         * @ngdoc method
         * @name lbServices.PermintaanBarang#findOne
         * @methodOf lbServices.PermintaanBarang
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PermintaanBarang` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/PermintaanBarangs/findOne",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.PermintaanBarang#updateAll
         * @methodOf lbServices.PermintaanBarang
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/PermintaanBarangs/update",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.PermintaanBarang#deleteById
         * @methodOf lbServices.PermintaanBarang
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/PermintaanBarangs/:id",
          method: "DELETE",
        },

        /**
         * @ngdoc method
         * @name lbServices.PermintaanBarang#count
         * @methodOf lbServices.PermintaanBarang
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/PermintaanBarangs/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.PermintaanBarang#prototype$updateAttributes
         * @methodOf lbServices.PermintaanBarang
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PermintaanBarang` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/PermintaanBarangs/:id",
          method: "PUT",
        },

        // INTERNAL. Use Barang.permintaanBarang.findById() instead.
        "::findById::Barang::permintaanBarang": {
          url: urlBase + "/Barangs/:id/permintaanBarang/:fk",
          method: "GET",
        },

        // INTERNAL. Use Barang.permintaanBarang.destroyById() instead.
        "::destroyById::Barang::permintaanBarang": {
          url: urlBase + "/Barangs/:id/permintaanBarang/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Barang.permintaanBarang.updateById() instead.
        "::updateById::Barang::permintaanBarang": {
          url: urlBase + "/Barangs/:id/permintaanBarang/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Barang.permintaanBarang() instead.
        "::get::Barang::permintaanBarang": {
          url: urlBase + "/Barangs/:id/permintaanBarang",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Barang.permintaanBarang.create() instead.
        "::create::Barang::permintaanBarang": {
          url: urlBase + "/Barangs/:id/permintaanBarang",
          method: "POST",
        },

        // INTERNAL. Use Barang.permintaanBarang.destroyAll() instead.
        "::delete::Barang::permintaanBarang": {
          url: urlBase + "/Barangs/:id/permintaanBarang",
          method: "DELETE",
        },

        // INTERNAL. Use Barang.permintaanBarang.count() instead.
        "::count::Barang::permintaanBarang": {
          url: urlBase + "/Barangs/:id/permintaanBarang/count",
          method: "GET",
        },

        // INTERNAL. Use Lokasi.permintaanBarang.findById() instead.
        "::findById::Lokasi::permintaanBarang": {
          url: urlBase + "/Lokasis/:id/permintaanBarang/:fk",
          method: "GET",
        },

        // INTERNAL. Use Lokasi.permintaanBarang.destroyById() instead.
        "::destroyById::Lokasi::permintaanBarang": {
          url: urlBase + "/Lokasis/:id/permintaanBarang/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Lokasi.permintaanBarang.updateById() instead.
        "::updateById::Lokasi::permintaanBarang": {
          url: urlBase + "/Lokasis/:id/permintaanBarang/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Lokasi.permintaanBarang() instead.
        "::get::Lokasi::permintaanBarang": {
          url: urlBase + "/Lokasis/:id/permintaanBarang",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Lokasi.permintaanBarang.create() instead.
        "::create::Lokasi::permintaanBarang": {
          url: urlBase + "/Lokasis/:id/permintaanBarang",
          method: "POST",
        },

        // INTERNAL. Use Lokasi.permintaanBarang.destroyAll() instead.
        "::delete::Lokasi::permintaanBarang": {
          url: urlBase + "/Lokasis/:id/permintaanBarang",
          method: "DELETE",
        },

        // INTERNAL. Use Lokasi.permintaanBarang.count() instead.
        "::count::Lokasi::permintaanBarang": {
          url: urlBase + "/Lokasis/:id/permintaanBarang/count",
          method: "GET",
        },

        // INTERNAL. Use PindahBarang.permintaanBarang.findById() instead.
        "::findById::PindahBarang::permintaanBarang": {
          url: urlBase + "/PindahBarangs/:id/permintaanBarang/:fk",
          method: "GET",
        },

        // INTERNAL. Use PindahBarang.permintaanBarang.destroyById() instead.
        "::destroyById::PindahBarang::permintaanBarang": {
          url: urlBase + "/PindahBarangs/:id/permintaanBarang/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use PindahBarang.permintaanBarang.updateById() instead.
        "::updateById::PindahBarang::permintaanBarang": {
          url: urlBase + "/PindahBarangs/:id/permintaanBarang/:fk",
          method: "PUT",
        },

        // INTERNAL. Use PindahBarang.permintaanBarang() instead.
        "::get::PindahBarang::permintaanBarang": {
          url: urlBase + "/PindahBarangs/:id/permintaanBarang",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use PindahBarang.permintaanBarang.create() instead.
        "::create::PindahBarang::permintaanBarang": {
          url: urlBase + "/PindahBarangs/:id/permintaanBarang",
          method: "POST",
        },

        // INTERNAL. Use PindahBarang.permintaanBarang.destroyAll() instead.
        "::delete::PindahBarang::permintaanBarang": {
          url: urlBase + "/PindahBarangs/:id/permintaanBarang",
          method: "DELETE",
        },

        // INTERNAL. Use PindahBarang.permintaanBarang.count() instead.
        "::count::PindahBarang::permintaanBarang": {
          url: urlBase + "/PindahBarangs/:id/permintaanBarang/count",
          method: "GET",
        },

        // INTERNAL. Use RencanaPembelian.permintaanBarang.findById() instead.
        "::findById::RencanaPembelian::permintaanBarang": {
          url: urlBase + "/RencanaPembelians/:id/permintaanBarang/:fk",
          method: "GET",
        },

        // INTERNAL. Use RencanaPembelian.permintaanBarang.destroyById() instead.
        "::destroyById::RencanaPembelian::permintaanBarang": {
          url: urlBase + "/RencanaPembelians/:id/permintaanBarang/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use RencanaPembelian.permintaanBarang.updateById() instead.
        "::updateById::RencanaPembelian::permintaanBarang": {
          url: urlBase + "/RencanaPembelians/:id/permintaanBarang/:fk",
          method: "PUT",
        },

        // INTERNAL. Use RencanaPembelian.permintaanBarang() instead.
        "::get::RencanaPembelian::permintaanBarang": {
          url: urlBase + "/RencanaPembelians/:id/permintaanBarang",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use RencanaPembelian.permintaanBarang.create() instead.
        "::create::RencanaPembelian::permintaanBarang": {
          url: urlBase + "/RencanaPembelians/:id/permintaanBarang",
          method: "POST",
        },

        // INTERNAL. Use RencanaPembelian.permintaanBarang.destroyAll() instead.
        "::delete::RencanaPembelian::permintaanBarang": {
          url: urlBase + "/RencanaPembelians/:id/permintaanBarang",
          method: "DELETE",
        },

        // INTERNAL. Use RencanaPembelian.permintaanBarang.count() instead.
        "::count::RencanaPembelian::permintaanBarang": {
          url: urlBase + "/RencanaPembelians/:id/permintaanBarang/count",
          method: "GET",
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.PermintaanBarang#updateOrCreate
         * @methodOf lbServices.PermintaanBarang
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PermintaanBarang` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.PermintaanBarang#update
         * @methodOf lbServices.PermintaanBarang
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.PermintaanBarang#destroyById
         * @methodOf lbServices.PermintaanBarang
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.PermintaanBarang#removeById
         * @methodOf lbServices.PermintaanBarang
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];



        /**
         * @ngdoc method
         * @name lbServices.PermintaanBarang#barang
         * @methodOf lbServices.PermintaanBarang
         *
         * @description
         *
         * Fetches belongsTo relation barang
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Barang` object.)
         * </em>
         */
        R.barang = function() {
          var TargetResource = $injector.get("Barang");
          var action = TargetResource["::get::PermintaanBarang::barang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.PermintaanBarang#lokasi
         * @methodOf lbServices.PermintaanBarang
         *
         * @description
         *
         * Fetches belongsTo relation lokasi
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Lokasi` object.)
         * </em>
         */
        R.lokasi = function() {
          var TargetResource = $injector.get("Lokasi");
          var action = TargetResource["::get::PermintaanBarang::lokasi"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.PermintaanBarang#pindahBarang
         * @methodOf lbServices.PermintaanBarang
         *
         * @description
         *
         * Fetches belongsTo relation pindahBarang
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PindahBarang` object.)
         * </em>
         */
        R.pindahBarang = function() {
          var TargetResource = $injector.get("PindahBarang");
          var action = TargetResource["::get::PermintaanBarang::pindahBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.PermintaanBarang#rencanaPembelian
         * @methodOf lbServices.PermintaanBarang
         *
         * @description
         *
         * Fetches belongsTo relation rencanaPembelian
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `RencanaPembelian` object.)
         * </em>
         */
        R.rencanaPembelian = function() {
          var TargetResource = $injector.get("RencanaPembelian");
          var action = TargetResource["::get::PermintaanBarang::rencanaPembelian"];
          return action.apply(R, arguments);
        };

    /**
    * @ngdoc property
    * @name lbServices.PermintaanBarang#modelName
    * @propertyOf lbServices.PermintaanBarang
    * @description
    * The name of the model represented by this $resource,
    * i.e. `PermintaanBarang`.
    */
    R.modelName = "PermintaanBarang";

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.PindahBarang
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `PindahBarang` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "PindahBarang",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/PindahBarangs/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use PindahBarang.barang() instead.
        "prototype$__get__barang": {
          url: urlBase + "/PindahBarangs/:id/barang",
          method: "GET",
        },

        // INTERNAL. Use PindahBarang.dariLokasi() instead.
        "prototype$__get__dariLokasi": {
          url: urlBase + "/PindahBarangs/:id/dariLokasi",
          method: "GET",
        },

        // INTERNAL. Use PindahBarang.keLokasi() instead.
        "prototype$__get__keLokasi": {
          url: urlBase + "/PindahBarangs/:id/keLokasi",
          method: "GET",
        },

        // INTERNAL. Use PindahBarang.permintaanBarang.findById() instead.
        "prototype$__findById__permintaanBarang": {
          url: urlBase + "/PindahBarangs/:id/permintaanBarang/:fk",
          method: "GET",
        },

        // INTERNAL. Use PindahBarang.permintaanBarang.destroyById() instead.
        "prototype$__destroyById__permintaanBarang": {
          url: urlBase + "/PindahBarangs/:id/permintaanBarang/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use PindahBarang.permintaanBarang.updateById() instead.
        "prototype$__updateById__permintaanBarang": {
          url: urlBase + "/PindahBarangs/:id/permintaanBarang/:fk",
          method: "PUT",
        },

        // INTERNAL. Use PindahBarang.permintaanBarang() instead.
        "prototype$__get__permintaanBarang": {
          url: urlBase + "/PindahBarangs/:id/permintaanBarang",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use PindahBarang.permintaanBarang.create() instead.
        "prototype$__create__permintaanBarang": {
          url: urlBase + "/PindahBarangs/:id/permintaanBarang",
          method: "POST",
        },

        // INTERNAL. Use PindahBarang.permintaanBarang.destroyAll() instead.
        "prototype$__delete__permintaanBarang": {
          url: urlBase + "/PindahBarangs/:id/permintaanBarang",
          method: "DELETE",
        },

        // INTERNAL. Use PindahBarang.permintaanBarang.count() instead.
        "prototype$__count__permintaanBarang": {
          url: urlBase + "/PindahBarangs/:id/permintaanBarang/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.PindahBarang#create
         * @methodOf lbServices.PindahBarang
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PindahBarang` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/PindahBarangs",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.PindahBarang#upsert
         * @methodOf lbServices.PindahBarang
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PindahBarang` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/PindahBarangs",
          method: "PUT",
        },

        /**
         * @ngdoc method
         * @name lbServices.PindahBarang#exists
         * @methodOf lbServices.PindahBarang
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/PindahBarangs/:id/exists",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.PindahBarang#findById
         * @methodOf lbServices.PindahBarang
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PindahBarang` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/PindahBarangs/:id",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.PindahBarang#find
         * @methodOf lbServices.PindahBarang
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PindahBarang` object.)
         * </em>
         */
        "find": {
          url: urlBase + "/PindahBarangs",
          method: "GET",
          isArray: true,
        },

        /**
         * @ngdoc method
         * @name lbServices.PindahBarang#findOne
         * @methodOf lbServices.PindahBarang
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PindahBarang` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/PindahBarangs/findOne",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.PindahBarang#updateAll
         * @methodOf lbServices.PindahBarang
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/PindahBarangs/update",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.PindahBarang#deleteById
         * @methodOf lbServices.PindahBarang
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/PindahBarangs/:id",
          method: "DELETE",
        },

        /**
         * @ngdoc method
         * @name lbServices.PindahBarang#count
         * @methodOf lbServices.PindahBarang
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/PindahBarangs/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.PindahBarang#prototype$updateAttributes
         * @methodOf lbServices.PindahBarang
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PindahBarang` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/PindahBarangs/:id",
          method: "PUT",
        },

        // INTERNAL. Use Barang.pindahBarang.findById() instead.
        "::findById::Barang::pindahBarang": {
          url: urlBase + "/Barangs/:id/pindahBarang/:fk",
          method: "GET",
        },

        // INTERNAL. Use Barang.pindahBarang.destroyById() instead.
        "::destroyById::Barang::pindahBarang": {
          url: urlBase + "/Barangs/:id/pindahBarang/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Barang.pindahBarang.updateById() instead.
        "::updateById::Barang::pindahBarang": {
          url: urlBase + "/Barangs/:id/pindahBarang/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Barang.pindahBarang() instead.
        "::get::Barang::pindahBarang": {
          url: urlBase + "/Barangs/:id/pindahBarang",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Barang.pindahBarang.create() instead.
        "::create::Barang::pindahBarang": {
          url: urlBase + "/Barangs/:id/pindahBarang",
          method: "POST",
        },

        // INTERNAL. Use Barang.pindahBarang.destroyAll() instead.
        "::delete::Barang::pindahBarang": {
          url: urlBase + "/Barangs/:id/pindahBarang",
          method: "DELETE",
        },

        // INTERNAL. Use Barang.pindahBarang.count() instead.
        "::count::Barang::pindahBarang": {
          url: urlBase + "/Barangs/:id/pindahBarang/count",
          method: "GET",
        },

        // INTERNAL. Use Lokasi.pindahBarang.findById() instead.
        "::findById::Lokasi::pindahBarang": {
          url: urlBase + "/Lokasis/:id/pindahBarang/:fk",
          method: "GET",
        },

        // INTERNAL. Use Lokasi.pindahBarang.destroyById() instead.
        "::destroyById::Lokasi::pindahBarang": {
          url: urlBase + "/Lokasis/:id/pindahBarang/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Lokasi.pindahBarang.updateById() instead.
        "::updateById::Lokasi::pindahBarang": {
          url: urlBase + "/Lokasis/:id/pindahBarang/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Lokasi.pindahBarang() instead.
        "::get::Lokasi::pindahBarang": {
          url: urlBase + "/Lokasis/:id/pindahBarang",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Lokasi.pindahBarang.create() instead.
        "::create::Lokasi::pindahBarang": {
          url: urlBase + "/Lokasis/:id/pindahBarang",
          method: "POST",
        },

        // INTERNAL. Use Lokasi.pindahBarang.destroyAll() instead.
        "::delete::Lokasi::pindahBarang": {
          url: urlBase + "/Lokasis/:id/pindahBarang",
          method: "DELETE",
        },

        // INTERNAL. Use Lokasi.pindahBarang.count() instead.
        "::count::Lokasi::pindahBarang": {
          url: urlBase + "/Lokasis/:id/pindahBarang/count",
          method: "GET",
        },

        // INTERNAL. Use PermintaanBarang.pindahBarang() instead.
        "::get::PermintaanBarang::pindahBarang": {
          url: urlBase + "/PermintaanBarangs/:id/pindahBarang",
          method: "GET",
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.PindahBarang#updateOrCreate
         * @methodOf lbServices.PindahBarang
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PindahBarang` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.PindahBarang#update
         * @methodOf lbServices.PindahBarang
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.PindahBarang#destroyById
         * @methodOf lbServices.PindahBarang
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.PindahBarang#removeById
         * @methodOf lbServices.PindahBarang
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];



        /**
         * @ngdoc method
         * @name lbServices.PindahBarang#barang
         * @methodOf lbServices.PindahBarang
         *
         * @description
         *
         * Fetches belongsTo relation barang
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Barang` object.)
         * </em>
         */
        R.barang = function() {
          var TargetResource = $injector.get("Barang");
          var action = TargetResource["::get::PindahBarang::barang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.PindahBarang#dariLokasi
         * @methodOf lbServices.PindahBarang
         *
         * @description
         *
         * Fetches belongsTo relation dariLokasi
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Lokasi` object.)
         * </em>
         */
        R.dariLokasi = function() {
          var TargetResource = $injector.get("Lokasi");
          var action = TargetResource["::get::PindahBarang::dariLokasi"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.PindahBarang#keLokasi
         * @methodOf lbServices.PindahBarang
         *
         * @description
         *
         * Fetches belongsTo relation keLokasi
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Lokasi` object.)
         * </em>
         */
        R.keLokasi = function() {
          var TargetResource = $injector.get("Lokasi");
          var action = TargetResource["::get::PindahBarang::keLokasi"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.PindahBarang.permintaanBarang
     * @object
     * @description
     *
     * The object `PindahBarang.permintaanBarang` groups methods
     * manipulating `PermintaanBarang` instances related to `PindahBarang`.
     *
     * Use {@link lbServices.PindahBarang#permintaanBarang} to query
     * all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.PindahBarang#permintaanBarang
         * @methodOf lbServices.PindahBarang
         *
         * @description
         *
         * Queries permintaanBarang of PindahBarang.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PermintaanBarang` object.)
         * </em>
         */
        R.permintaanBarang = function() {
          var TargetResource = $injector.get("PermintaanBarang");
          var action = TargetResource["::get::PindahBarang::permintaanBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.PindahBarang.permintaanBarang#count
         * @methodOf lbServices.PindahBarang.permintaanBarang
         *
         * @description
         *
         * Counts permintaanBarang of PindahBarang.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.permintaanBarang.count = function() {
          var TargetResource = $injector.get("PermintaanBarang");
          var action = TargetResource["::count::PindahBarang::permintaanBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.PindahBarang.permintaanBarang#create
         * @methodOf lbServices.PindahBarang.permintaanBarang
         *
         * @description
         *
         * Creates a new instance in permintaanBarang of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PermintaanBarang` object.)
         * </em>
         */
        R.permintaanBarang.create = function() {
          var TargetResource = $injector.get("PermintaanBarang");
          var action = TargetResource["::create::PindahBarang::permintaanBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.PindahBarang.permintaanBarang#destroyAll
         * @methodOf lbServices.PindahBarang.permintaanBarang
         *
         * @description
         *
         * Deletes all permintaanBarang of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.permintaanBarang.destroyAll = function() {
          var TargetResource = $injector.get("PermintaanBarang");
          var action = TargetResource["::delete::PindahBarang::permintaanBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.PindahBarang.permintaanBarang#destroyById
         * @methodOf lbServices.PindahBarang.permintaanBarang
         *
         * @description
         *
         * Delete a related item by id for permintaanBarang
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for permintaanBarang
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.permintaanBarang.destroyById = function() {
          var TargetResource = $injector.get("PermintaanBarang");
          var action = TargetResource["::destroyById::PindahBarang::permintaanBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.PindahBarang.permintaanBarang#findById
         * @methodOf lbServices.PindahBarang.permintaanBarang
         *
         * @description
         *
         * Find a related item by id for permintaanBarang
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for permintaanBarang
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PermintaanBarang` object.)
         * </em>
         */
        R.permintaanBarang.findById = function() {
          var TargetResource = $injector.get("PermintaanBarang");
          var action = TargetResource["::findById::PindahBarang::permintaanBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.PindahBarang.permintaanBarang#updateById
         * @methodOf lbServices.PindahBarang.permintaanBarang
         *
         * @description
         *
         * Update a related item by id for permintaanBarang
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for permintaanBarang
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PermintaanBarang` object.)
         * </em>
         */
        R.permintaanBarang.updateById = function() {
          var TargetResource = $injector.get("PermintaanBarang");
          var action = TargetResource["::updateById::PindahBarang::permintaanBarang"];
          return action.apply(R, arguments);
        };

    /**
    * @ngdoc property
    * @name lbServices.PindahBarang#modelName
    * @propertyOf lbServices.PindahBarang
    * @description
    * The name of the model represented by this $resource,
    * i.e. `PindahBarang`.
    */
    R.modelName = "PindahBarang";

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.RencanaPembelian
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `RencanaPembelian` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "RencanaPembelian",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/RencanaPembelians/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use RencanaPembelian.barang() instead.
        "prototype$__get__barang": {
          url: urlBase + "/RencanaPembelians/:id/barang",
          method: "GET",
        },

        // INTERNAL. Use RencanaPembelian.permintaanBarang.findById() instead.
        "prototype$__findById__permintaanBarang": {
          url: urlBase + "/RencanaPembelians/:id/permintaanBarang/:fk",
          method: "GET",
        },

        // INTERNAL. Use RencanaPembelian.permintaanBarang.destroyById() instead.
        "prototype$__destroyById__permintaanBarang": {
          url: urlBase + "/RencanaPembelians/:id/permintaanBarang/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use RencanaPembelian.permintaanBarang.updateById() instead.
        "prototype$__updateById__permintaanBarang": {
          url: urlBase + "/RencanaPembelians/:id/permintaanBarang/:fk",
          method: "PUT",
        },

        // INTERNAL. Use RencanaPembelian.permintaanBarang() instead.
        "prototype$__get__permintaanBarang": {
          url: urlBase + "/RencanaPembelians/:id/permintaanBarang",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use RencanaPembelian.permintaanBarang.create() instead.
        "prototype$__create__permintaanBarang": {
          url: urlBase + "/RencanaPembelians/:id/permintaanBarang",
          method: "POST",
        },

        // INTERNAL. Use RencanaPembelian.permintaanBarang.destroyAll() instead.
        "prototype$__delete__permintaanBarang": {
          url: urlBase + "/RencanaPembelians/:id/permintaanBarang",
          method: "DELETE",
        },

        // INTERNAL. Use RencanaPembelian.permintaanBarang.count() instead.
        "prototype$__count__permintaanBarang": {
          url: urlBase + "/RencanaPembelians/:id/permintaanBarang/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.RencanaPembelian#create
         * @methodOf lbServices.RencanaPembelian
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `RencanaPembelian` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/RencanaPembelians",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.RencanaPembelian#upsert
         * @methodOf lbServices.RencanaPembelian
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `RencanaPembelian` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/RencanaPembelians",
          method: "PUT",
        },

        /**
         * @ngdoc method
         * @name lbServices.RencanaPembelian#exists
         * @methodOf lbServices.RencanaPembelian
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/RencanaPembelians/:id/exists",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.RencanaPembelian#findById
         * @methodOf lbServices.RencanaPembelian
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `RencanaPembelian` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/RencanaPembelians/:id",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.RencanaPembelian#find
         * @methodOf lbServices.RencanaPembelian
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `RencanaPembelian` object.)
         * </em>
         */
        "find": {
          url: urlBase + "/RencanaPembelians",
          method: "GET",
          isArray: true,
        },

        /**
         * @ngdoc method
         * @name lbServices.RencanaPembelian#findOne
         * @methodOf lbServices.RencanaPembelian
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `RencanaPembelian` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/RencanaPembelians/findOne",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.RencanaPembelian#updateAll
         * @methodOf lbServices.RencanaPembelian
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/RencanaPembelians/update",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.RencanaPembelian#deleteById
         * @methodOf lbServices.RencanaPembelian
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/RencanaPembelians/:id",
          method: "DELETE",
        },

        /**
         * @ngdoc method
         * @name lbServices.RencanaPembelian#count
         * @methodOf lbServices.RencanaPembelian
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/RencanaPembelians/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.RencanaPembelian#prototype$updateAttributes
         * @methodOf lbServices.RencanaPembelian
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `RencanaPembelian` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/RencanaPembelians/:id",
          method: "PUT",
        },

        // INTERNAL. Use Barang.rencanaPembelian.findById() instead.
        "::findById::Barang::rencanaPembelian": {
          url: urlBase + "/Barangs/:id/rencanaPembelian/:fk",
          method: "GET",
        },

        // INTERNAL. Use Barang.rencanaPembelian.destroyById() instead.
        "::destroyById::Barang::rencanaPembelian": {
          url: urlBase + "/Barangs/:id/rencanaPembelian/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Barang.rencanaPembelian.updateById() instead.
        "::updateById::Barang::rencanaPembelian": {
          url: urlBase + "/Barangs/:id/rencanaPembelian/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Barang.rencanaPembelian() instead.
        "::get::Barang::rencanaPembelian": {
          url: urlBase + "/Barangs/:id/rencanaPembelian",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Barang.rencanaPembelian.create() instead.
        "::create::Barang::rencanaPembelian": {
          url: urlBase + "/Barangs/:id/rencanaPembelian",
          method: "POST",
        },

        // INTERNAL. Use Barang.rencanaPembelian.destroyAll() instead.
        "::delete::Barang::rencanaPembelian": {
          url: urlBase + "/Barangs/:id/rencanaPembelian",
          method: "DELETE",
        },

        // INTERNAL. Use Barang.rencanaPembelian.count() instead.
        "::count::Barang::rencanaPembelian": {
          url: urlBase + "/Barangs/:id/rencanaPembelian/count",
          method: "GET",
        },

        // INTERNAL. Use PermintaanBarang.rencanaPembelian() instead.
        "::get::PermintaanBarang::rencanaPembelian": {
          url: urlBase + "/PermintaanBarangs/:id/rencanaPembelian",
          method: "GET",
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.RencanaPembelian#updateOrCreate
         * @methodOf lbServices.RencanaPembelian
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `RencanaPembelian` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.RencanaPembelian#update
         * @methodOf lbServices.RencanaPembelian
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.RencanaPembelian#destroyById
         * @methodOf lbServices.RencanaPembelian
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.RencanaPembelian#removeById
         * @methodOf lbServices.RencanaPembelian
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];



        /**
         * @ngdoc method
         * @name lbServices.RencanaPembelian#barang
         * @methodOf lbServices.RencanaPembelian
         *
         * @description
         *
         * Fetches belongsTo relation barang
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Barang` object.)
         * </em>
         */
        R.barang = function() {
          var TargetResource = $injector.get("Barang");
          var action = TargetResource["::get::RencanaPembelian::barang"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.RencanaPembelian.permintaanBarang
     * @object
     * @description
     *
     * The object `RencanaPembelian.permintaanBarang` groups methods
     * manipulating `PermintaanBarang` instances related to `RencanaPembelian`.
     *
     * Use {@link lbServices.RencanaPembelian#permintaanBarang} to query
     * all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.RencanaPembelian#permintaanBarang
         * @methodOf lbServices.RencanaPembelian
         *
         * @description
         *
         * Queries permintaanBarang of RencanaPembelian.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PermintaanBarang` object.)
         * </em>
         */
        R.permintaanBarang = function() {
          var TargetResource = $injector.get("PermintaanBarang");
          var action = TargetResource["::get::RencanaPembelian::permintaanBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.RencanaPembelian.permintaanBarang#count
         * @methodOf lbServices.RencanaPembelian.permintaanBarang
         *
         * @description
         *
         * Counts permintaanBarang of RencanaPembelian.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.permintaanBarang.count = function() {
          var TargetResource = $injector.get("PermintaanBarang");
          var action = TargetResource["::count::RencanaPembelian::permintaanBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.RencanaPembelian.permintaanBarang#create
         * @methodOf lbServices.RencanaPembelian.permintaanBarang
         *
         * @description
         *
         * Creates a new instance in permintaanBarang of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PermintaanBarang` object.)
         * </em>
         */
        R.permintaanBarang.create = function() {
          var TargetResource = $injector.get("PermintaanBarang");
          var action = TargetResource["::create::RencanaPembelian::permintaanBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.RencanaPembelian.permintaanBarang#destroyAll
         * @methodOf lbServices.RencanaPembelian.permintaanBarang
         *
         * @description
         *
         * Deletes all permintaanBarang of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.permintaanBarang.destroyAll = function() {
          var TargetResource = $injector.get("PermintaanBarang");
          var action = TargetResource["::delete::RencanaPembelian::permintaanBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.RencanaPembelian.permintaanBarang#destroyById
         * @methodOf lbServices.RencanaPembelian.permintaanBarang
         *
         * @description
         *
         * Delete a related item by id for permintaanBarang
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for permintaanBarang
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.permintaanBarang.destroyById = function() {
          var TargetResource = $injector.get("PermintaanBarang");
          var action = TargetResource["::destroyById::RencanaPembelian::permintaanBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.RencanaPembelian.permintaanBarang#findById
         * @methodOf lbServices.RencanaPembelian.permintaanBarang
         *
         * @description
         *
         * Find a related item by id for permintaanBarang
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for permintaanBarang
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PermintaanBarang` object.)
         * </em>
         */
        R.permintaanBarang.findById = function() {
          var TargetResource = $injector.get("PermintaanBarang");
          var action = TargetResource["::findById::RencanaPembelian::permintaanBarang"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.RencanaPembelian.permintaanBarang#updateById
         * @methodOf lbServices.RencanaPembelian.permintaanBarang
         *
         * @description
         *
         * Update a related item by id for permintaanBarang
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for permintaanBarang
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PermintaanBarang` object.)
         * </em>
         */
        R.permintaanBarang.updateById = function() {
          var TargetResource = $injector.get("PermintaanBarang");
          var action = TargetResource["::updateById::RencanaPembelian::permintaanBarang"];
          return action.apply(R, arguments);
        };

    /**
    * @ngdoc property
    * @name lbServices.RencanaPembelian#modelName
    * @propertyOf lbServices.RencanaPembelian
    * @description
    * The name of the model represented by this $resource,
    * i.e. `RencanaPembelian`.
    */
    R.modelName = "RencanaPembelian";

    return R;
  }]);


module
  .factory('LoopBackAuth', function() {
    var props = ['accessTokenId', 'currentUserId'];

    function LoopBackAuth() {
      var self = this;
      props.forEach(function(name) {
        self[name] = load(name);
      });
      this.rememberMe = undefined;
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.save = function() {
      var self = this;
      var storage = this.rememberMe ? localStorage : sessionStorage;
      props.forEach(function(name) {
        save(storage, name, self[name]);
      });
    };

    LoopBackAuth.prototype.setUser = function(accessTokenId, userId, userData) {
      this.accessTokenId = accessTokenId;
      this.currentUserId = userId;
      this.currentUserData = userData;
    }

    LoopBackAuth.prototype.clearUser = function() {
      this.accessTokenId = null;
      this.currentUserId = null;
      this.currentUserData = null;
    }

    return new LoopBackAuth();

    // Note: LocalStorage converts the value to string
    // We are using empty string as a marker for null/undefined values.
    function save(storage, name, value) {
      var key = '$LoopBack$' + name;
      if (value == null) value = '';
      storage[key] = value;
    }

    function load(name) {
      var key = '$LoopBack$' + name;
      return localStorage[key] || sessionStorage[key] || null;
    }
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');
  }])
  .factory('LoopBackAuthRequestInterceptor', [ '$q', 'LoopBackAuth',
    function($q, LoopBackAuth) {
      return {
        'request': function(config) {

          // filter out non urlBase requests
          if (config.url.substr(0, urlBase.length) !== urlBase) {
            return config;
          }

          if (LoopBackAuth.accessTokenId) {
            config.headers[authHeader] = LoopBackAuth.accessTokenId;
          } else if (config.__isGetCurrentUser__) {
            // Return a stub 401 error for User.getCurrent() when
            // there is no user logged in
            var res = {
              body: { error: { status: 401 } },
              status: 401,
              config: config,
              headers: function() { return undefined; }
            };
            return $q.reject(res);
          }
          return config || $q.when(config);
        }
      }
    }])

  /**
   * @ngdoc provider
   * @name lbServices.LoopBackResourceProvider
   */
  .provider('LoopBackResource', function LoopBackResourceProvider() {
    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setAuthHeader
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} header The header name to use, e.g. `X-Access-Token`
     */
    this.setAuthHeader = function(header) {
      authHeader = header;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} url
     */
    this.setUrlBase = function(url) {
      urlBase = url;
    };

    this.$get = ['$resource', function($resource) {
      return function(url, params, actions) {
        var resource = $resource(url, params, actions);

        // Angular always calls POST on $save()
        // This hack is based on
        // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
        resource.prototype.$save = function(success, error) {
          // Fortunately, LoopBack provides a convenient `upsert` method
          // that exactly fits our needs.
          var result = resource.upsert.call(this, {}, this, success, error);
          return result.$promise || result;
        };
        return resource;
      };
    }];
  });

})(window, window.angular);
