import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component{
    constructor(){
        super();
        this.state = {
            name:"",
            email:"",
            password:"",
            password2:"",
            errors:{}
        }   
    }
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/dashboard");
        }
      }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }

    onChange = e => {
        this.setState({[e.target.id]:e.target.value})
    }

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            password2:this.state.password2
        }

        this.props.registerUser(newUser, this.props.history); 
    }

    render(){
        const {name, email, password, password2 ,errors} = this.state;

        return(
            <div className="form-box ">
            <form className="signup-form"  onSubmit={this.onSubmit}>

               <div><Link to="/"><i className="fa fa-arrow-circle-left  "></i> Back to Home</Link></div>

                <h2>Register</h2>
                <hr/>
                <div className="form-group">
                    <input type="text" 
                           id="name" 
                           placeholder="Name" 
                           value={name}
                           error={errors.name} 
                           onChange={this.onChange} 
                           className={classnames("form-control", {
                            invalid: errors.name
                          })}/> 
                        <span className="red-text">{errors.name}</span>

                </div>

                <div className="form-group">
                    <input type="email" 
                           id="email" 
                           placeholder="Email Address" 
                           value={email}
                           error={errors.email}
                           onChange={this.onChange} 
                           className={classnames("form-control", {
                            invalid: errors.email
                          })}/>
                    <span className="red-text">{errors.email}</span>
                </div>

                <div className="form-group">
                    <input type="password" 
                           id="password" 
                           placeholder="Password" 
                           value={password}
                           error= {errors.password} 
                           onChange={this.onChange}
                           className={classnames("form-control", {
                            invalid: errors.password
                          })} />
                    <span className="red-text">{errors.password}</span>                     
                </div>

                <div className="form-group">
                    <input type="password" 
                           id="password2"
                           placeholder="Confirm Password" 
                           value={password2} 
                           error={errors.password}
                           onChange={this.onChange}
                           className={classnames("form-control", {
                            invalid: errors.password2
                          })} />
                    <span className="red-text">{errors.password2}</span>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block btn-lg">Sign Up</button>
                </div>
                <div className="text-center">Already have an account? <Link to="/login">Login here</Link></div>

            </form>
        </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });

export default connect(mapStateToProps,{registerUser})(withRouter(Register));