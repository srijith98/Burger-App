import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';

class Auth extends Component {

    state = {
        authForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: "email",
                    name: "email",
                    placeholder: "Your Email"
                },
                value: '',
                label: 'Email',
                valid: false,
                rules: {
                    required: true,
                    isEmail: true
                },
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: "password",
                    name: "password",
                    placeholder: "Password"
                },
                value: '',
                label: 'Password',
                valid: false,
                rules: {
                    required: true,
                    minLength: 6
                },
                touched: false
            }
        },
        isSignUp: false
    }

    componentDidMount() {
        if(!this.props.buildingBurger && this.props.redirectPath !== '/') {
            this.props.onAuthRedirectPath();
        }
    }

    checkValidity(inputValue, rules) {
        let isValid = true;

        if(rules.required) {
            isValid = inputValue.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = inputValue.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = inputValue.length <= rules.maxLength && isValid;
        }

        if(rules.isEmail) {
            isValid = (/^(\w+[_.-]*\w*)@([a-zA-Z]+)\.([a-zA-Z]{2,5})$/).test(inputValue) && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, elementName) => {
        const updatedAuthForm = {
            ...this.state.authForm,
            [elementName]: {
                ...this.state.authForm[elementName],
                value: event.target.value,
                touched: true,
                valid: this.checkValidity(event.target.value, this.state.authForm[elementName].rules)
            }
        }
        this.setState({authForm: updatedAuthForm})
    };

    submitHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignUp)
    };

    switchAuthHandler = (event) => {
        event.preventDefault()
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        })
    };

    render() {

        const authFormArray = [];
        for(let key in this.state.authForm) {
            authFormArray.push({
                id: key,
                config: this.state.authForm[key]
            });
        }

        const formElements = authFormArray.map(element => (
            <Input key={element.id} elementType={element.config.elementType} label={element.config.label} elementConfig={element.config.elementConfig} value={element.config.value} changed={(event) => this.inputChangedHandler(event, element.id)} invalid={!element.config.valid} shouldValidate={element.config.rules} touched={element.config.touched} />
        ))

        let form = (
            <form>
                {formElements}
                <Button btnType="Success" clicked={this.submitHandler}>{this.state.isSignUp? 'SIGN UP': 'LOG IN'}</Button><br />
                <Button btnType="Danger" clicked={this.switchAuthHandler}>{this.state.isSignUp? 'GO BACK TO LOG IN': 'NEW USER? SIGN UP'}</Button>
            </form>
        );

        if(this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if(this.props.error) {
            errorMessage = <p style={{color: 'red'}}>{this.props.error}</p>
        }

        let authRedirect = null;
        if(this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.redirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                {form}
            </div>
        );
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onAuthRedirectPath: () => dispatch(actions.authRedirectPath('/'))
    }
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        redirectPath: state.auth.redirectPath
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);