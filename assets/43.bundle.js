(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{1309:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(e[i]=a[i])}return e},l=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),s=a(0),n=g(s),r=a(21),o=a(32),u=a(36),d=g(a(333)),m=g(a(29)),p=g(a(197)),c=g(a(46));a(37);var f=g(a(141));function g(e){return e&&e.__esModule?e:{default:e}}var h=r.Modal.error,b=void 0,V=void 0,y=r.Form.Item;function E(e){var t="image/jpeg"===e.type||"image/png"===e.type;t||r.message.error("You can only upload PNG file!");var a=e.size/1024/1024<2;return a||r.message.error("Image must smaller than 2MB!"),t&&a}var v=d.default,M=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.handleChange=function(e){var t,i,l;(console.log("(info.file.status dfgdfg",e.file.status),"uploading"!==e.file.status)?"done"===e.file.status&&(console.log("(info.file.status dfgdfg",e),console.log("(info.file.status dfgdfg",e.file),t=e.file.originFileObj,i=function(e){return a.setState({imageUrl:e,loading:!1},(function(){console.log("imageUrl",a.state.imageUrl)}))},(l=new FileReader).addEventListener("load",(function(){return i(l.result)})),l.readAsDataURL(t)):a.setState({loading:!0})},a.handleSubmit=function(e){a.setState({disabledButton:!1}),e.preventDefault(),a.props.form.validateFields((function(e,t){e||(t.phoneNumber=parseInt(t.phoneNumber),t.id=V.id,t.isProfileComplete=!0,t.chairSign=a.state.imageUrl,console.log("values in hanfdlr submit",t),a.setState({disabledButton:!0}),fetch(m.default.APIURL+"/updateInternalUser",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Origin":"*"},credentials:"include",body:JSON.stringify({data:t})}).then((function(e){return e.json()})).then((function(e){200===e.status?(u.toast.success(e.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}),a.setState({disabledButton:!1,serverSideValidationError:[]}),window.location.reload()):300===e.status?(a.setState({disabledButton:!1,serverSideValidationError:[]}),u.toast.error(e.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1})):422===e.status?a.setState({disabledButton:!1,serverSideValidationError:e.message}):500===e.status?(a.setState({disabledButton:!1}),a.props.history.push("/serverError")):400===e.status?(a.setState({disabledButton:!1}),a.props.history.push("/badRequest")):403===e.status&&(a.setState({disabledButton:!1}),a.props.history.push("/forbiddenRequest"))})))}))},a.dummyRequestSign=function(e){var t=e.file,i=e.onSuccess;console.log("dummyRequestCurriculumVitae",t),a.setState({imageUrl:t},(function(){})),setTimeout((function(){i("ok")}),0)},a.state={imageUrl:"",loading:!1,serverSideValidationError:[],disabledButton:!1},V=a.props.authUser,b=a,a.handleSubmit=a.handleSubmit.bind(a),a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),l(t,[{key:"componentDidMount",value:function(){var e=this;this.setState({user:this.props.authUser}),fetch(m.default.APIURL+"/getInternalUser",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Origin":"*"},credentials:"include",body:JSON.stringify({internalUserId:V.id})}).then((function(e){return e.json()})).then((function(t){200===t.status?(console.log("in component did mount 200",t),e.setState({salutation:t.internalUserData.salutation,firstName:t.internalUserData.firstName,middleName:t.internalUserData.middleName,lastName:t.internalUserData.lastName,email:t.internalUserData.email,jobTitle:t.internalUserData.jobTitle,highestQualification:t.internalUserData.highestQualification,department:t.internalUserData.department,organization:t.internalUserData.organization,principleField:t.internalUserData.principleField,nationality:t.internalUserData.nationality,targetArticles:t.internalUserData.targetArticles,internalUserId:t.internalUserData.id,phoneNumber:t.internalUserData.phoneNumber,universityName:t.internalUserData.universityName},(function(){})),5===V.role&&e.setState({imageUrl:t.internalUserData.chairSign})):300===t.status?u.toast.error(t.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}):401===t.status?h({title:c.default.SessionExpired+t.message,content:"",onOk:function(){b.props.history.push("/signIn")}}):500===t.status?e.props.history.push("/serverError"):400===t.status?e.props.history.push("/badRequest"):403===t.status&&e.props.history.push("/forbiddenRequest")}))}},{key:"render",value:function(){document.title="Profile | "+c.default.PageTitle;var e=n.default.createElement("div",null,n.default.createElement(r.Icon,{type:this.state.loading?"loading":"plus"}),n.default.createElement("div",{className:"ant-upload-text"},"Upload")),t=this.props.form.getFieldDecorator,a={labelCol:{xs:{span:24},sm:{span:8}},wrapperCol:{xs:{span:24},sm:{span:16}}},l=this.state.imageUrl;return n.default.createElement("div",null,n.default.createElement(p.default,{propertyProps:this.props}),n.default.createElement(r.Card,{className:"cardcss",title:n.default.createElement("b",null,"Profile"),extra:n.default.createElement(r.Button,{type:"primary",href:"/internalResetPassword?id="+this.props.authUser.id},"Reset Password")},n.default.createElement(r.Form,{onSubmit:this.handleSubmit},7!==this.props.authUser.role&&n.default.createElement(y,i({label:"Salutation"},a),t("salutation",{initialValue:this.state.salutation,rules:[{required:!0,message:f.default.ValidationMessages.salutationRequiredMessage}]})(n.default.createElement(r.Select,{placeholder:"Please select salutation",onChange:this.handleSelectChange},n.default.createElement(r.Select.Option,{value:"Dr"},"Dr"),n.default.createElement(r.Select.Option,{value:"Mr"},"Mr"),n.default.createElement(r.Select.Option,{value:"Mrs"},"Mrs"),n.default.createElement(r.Select.Option,{value:"Miss"},"Miss"),n.default.createElement(r.Select.Option,{value:"Sir"},"Sir")))),n.default.createElement(y,i({label:"First name"},a),t("firstName",{initialValue:this.state.firstName,rules:[{required:!0,message:f.default.ValidationMessages.firstNameRequiredValidation},{max:100,message:f.default.ValidationMessages.firstNameMaxValidation},{min:2,message:f.default.ValidationMessages.firstNameMinValidation},{pattern:new RegExp("^[a-zA-Z-,]+(s{0,1}[a-zA-Z-, ])*$"),message:f.default.ValidationMessages.alphabetPatternValidation}]})(n.default.createElement(r.Input,{type:"text",name:"firstName",setfieldsvalue:this.state.firstName,placeholder:"Please input your first name"}))),n.default.createElement(y,i({label:"Middle name"},a),t("middleName",{initialValue:this.state.middleName,rules:[{max:100,message:f.default.ValidationMessages.middleNameMaxValidation},{min:2,message:f.default.ValidationMessages.middleNameMinValidation},{pattern:new RegExp("^[a-zA-Z-,]+(s{0,1}[a-zA-Z-, ])*$"),message:f.default.ValidationMessages.alphabetPatternValidation}]})(n.default.createElement(r.Input,{name:"middleName",setfieldsvalue:this.state.middleName,placeholder:"Please input middle name"}))),n.default.createElement(y,i({label:"Last name"},a),t("lastName",{initialValue:this.state.lastName,rules:[{required:!0,message:f.default.ValidationMessages.lastNameRequiredValidation},{max:100,message:f.default.ValidationMessages.lastNameMaxValidation},{min:2,message:f.default.ValidationMessages.lastNameMinValidation},{pattern:new RegExp("^[a-zA-Z-,]+(s{0,1}[a-zA-Z-, ])*$"),message:f.default.ValidationMessages.alphabetPatternValidation}]})(n.default.createElement(r.Input,{name:"lastName",setfieldsvalue:this.state.lastName,placeholder:"Please input last name"}))),n.default.createElement(y,i({label:"E-mail"},a),t("email",{initialValue:this.state.email,rules:[{required:!0,message:f.default.ValidationMessages.emailRequiredValidation},{type:"email",message:f.default.ValidationMessages.emailValidation}]})(n.default.createElement(r.Input,{name:"email",readOnly:"readonly",setfieldsvalue:this.state.email,placeholder:"Please input email"}))),7!==this.props.authUser.role&&n.default.createElement(y,i({label:"Job title"},a),t("jobTitle",{initialValue:this.state.jobTitle,rules:[{required:!0,message:f.default.ValidationMessages.jobTitleRequiredValidation},{max:100,message:f.default.ValidationMessages.jobTitleMaxValidation},{pattern:new RegExp("^[a-zA-Z0-9-,]+(s{0,1}[a-zA-Z0-9-, ])*$"),message:f.default.ValidationMessages.patternValidation}]})(n.default.createElement(r.Input,{type:"text",name:"jobTitle",placeholder:"Please input job title"}))),1!==V.role&&7!==V.role?[n.default.createElement(y,i({label:"Highest qualification conferred"},a),t("highestQualification",{initialValue:this.state.highestQualification,rules:[{required:!0,message:f.default.ValidationMessages.highestQualificationRequiredValidation},{max:100,message:f.default.ValidationMessages.highestQualificationMaxValidation},{pattern:new RegExp("^[a-zA-Z0-9-,]+(s{0,1}[a-zA-Z0-9-, ])*$"),message:f.default.ValidationMessages.patternValidation}]})(n.default.createElement(r.Input,{type:"text",placeholder:"Please input highest qualification"}))),n.default.createElement(y,i({label:"Department"},a),t("department",{initialValue:this.state.department,rules:[{required:!0,message:f.default.ValidationMessages.departmentRequiredValidation},{max:100,message:f.default.ValidationMessages.departmentMaxValidation},{pattern:new RegExp("^[a-zA-Z0-9-,]+(s{0,1}[a-zA-Z0-9-, ])*$"),message:f.default.ValidationMessages.patternValidation}]})(n.default.createElement(r.Input,{type:"text",placeholder:"Please input department"}))),n.default.createElement(y,i({label:"Organization/Institution"},a),t("organization",{initialValue:this.state.organization,rules:[{required:!0,message:f.default.ValidationMessages.organizationRequiredValidation},{max:100,message:f.default.ValidationMessages.organizationMaxValidation},{pattern:new RegExp("^[a-zA-Z0-9-,]+(s{0,1}[a-zA-Z0-9-, ])*$"),message:f.default.ValidationMessages.patternValidation}]})(n.default.createElement(r.Input,{type:"text",placeholder:"Please input organization"}))),n.default.createElement(y,i({label:"Principle field of interest to review"},a),t("principleField",{initialValue:this.state.principleField,rules:[{required:!0,message:f.default.ValidationMessages.principleRequiredValidation},{max:100,message:f.default.ValidationMessages.principleMaxValidation},{pattern:new RegExp("^[a-zA-Z0-9-,]+(s{0,1}[a-zA-Z0-9-, ])*$"),message:f.default.ValidationMessages.patternValidation}]})(n.default.createElement(r.Input,{type:"text",placeholder:"Please input principle field"}))),n.default.createElement(y,i({label:"Nationality"},a),t("nationality",{initialValue:this.state.nationality,rules:[{required:!0,message:f.default.ValidationMessages.nationalityRequiredValidation}]})(n.default.createElement(r.Select,{placeholder:"Nationality",onChange:this.handleSelectChange,showSearch:!0,optionFilterProp:"children",onSearch:this.onSearch,filterOption:function(e,t){return t.props.children.toLowerCase().indexOf(e.toLowerCase())>=0}},v.map((function(e){return n.default.createElement(r.Select.Option,{value:e.code},e.name)}))))),n.default.createElement(y,i({label:"Target articles/proposals to review/year"},a),t("targetArticles",{initialValue:this.state.targetArticles,rules:[{required:!0,message:f.default.ValidationMessages.targetArticlesRequiredValidation},{max:100,message:f.default.ValidationMessages.targetArticlesMaxValidation},{pattern:new RegExp("^[a-zA-Z0-9-,]+(s{0,1}[a-zA-Z0-9-, ])*$"),message:f.default.ValidationMessages.patternValidation}]})(n.default.createElement(r.Input,{name:"targetArticles",setfieldsvalue:this.state.affilation,placeholder:"Please input target articles"})))]:null,5===V.role?n.default.createElement(y,i({},a,{label:"Upload sign"}),t("upload",{rules:[{required:"true",message:c.default.uploadSignValidation}]})(n.default.createElement("div",{className:"clearfix"},n.default.createElement(r.Upload,{name:"avatar",customRequest:this.dummyRequestSign,listType:"picture-card",className:"avatar-uploader",showUploadList:!1,beforeUpload:E,onChange:this.handleChange},l?n.default.createElement("img",{src:l,alt:"avatar",style:{width:"100%"}}):e)))):null,7===this.props.authUser.role&&n.default.createElement(y,i({label:"Phone number"},a),t("phoneNumber",{initialValue:this.state.phoneNumber,rules:[{required:!0,message:f.default.ValidationMessages.phoneNumberValidation}]})(n.default.createElement(r.Input,{type:"number",name:"phoneNumber",setfieldsvalue:this.state.phoneNumber,placeholder:"Please input your phone number"}))),7===this.props.authUser.role&&n.default.createElement(y,i({label:"University name"},a),t("universityName",{initialValue:this.state.universityName,rules:[{required:!0,message:f.default.ValidationMessages.universityNameRequiredValidation}]})(n.default.createElement(r.Input,{type:"text",name:"universityName",setfieldsvalue:this.state.universityName,placeholder:"Please input your university name"}))),n.default.createElement("span",{style:{marginLeft:"35%"},className:"ant-form-text"}," ",this.state.serverSideValidationError&&this.state.serverSideValidationError.map((function(e){return n.default.createElement("span",null," ",n.default.createElement("span",{className:"wt-color-red"},e," ")," ",n.default.createElement("br",null))}))),(this.state.serverSideValidationError&&n.default.createElement("br",null),n.default.createElement("br",null)),n.default.createElement(y,{wrapperCol:{xs:24,sm:{span:12,offset:5}}},n.default.createElement(r.Button,{type:"primary",disabled:this.state.disabledButton,htmlType:"submit"},"Update")))))}}]),t}(s.Component),S=r.Form.create()(M);t.default=(0,o.connect)((function(e){return{authUser:e.auth.authUser}}))(S)}}]);