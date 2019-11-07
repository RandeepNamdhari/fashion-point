import React from 'react';

import FormInput from '../form-input/form-input.component';

import CustomButton from '../custom-button/custom-button.component';

import {auth,SignInWithGoogle} from '../../firebase/firebase.utils';

import './sign-in.style.scss';

class SignIn extends React.Component{
	constructor(props)
	{
		super(props);

		this.state={
			email:'',
			password:'',
			error_message:''
		}

	}

	handleSubmit=async event=>{
		event.preventDefault();
		const {email , password}=this.state;
		try
		{
			await auth.signInWithEmailAndPassword(email,password);
		
		    this.setState({email:'',password:'',error_message:''});

		}
		catch(error)
		{
			this.setState({error_message:error.message});
		}
		
	}

	handleChange=event=>{
		const {name,value}=event.target;

		this.setState({[name]:value});
	}

	render(){
		return (
			<div className='sign-in'>
			   <h2>I already have an account.</h2>
			   <span>Sign in with your email and password.</span>
                 
			   <form onSubmit={this.handleSubmit}>
			      <FormInput label='Email' name='email' handleChange={this.handleChange} type='email' value={this.state.email} required />
			      

			      <FormInput label='Password' name='password' type='password' handleChange={this.handleChange} value={this.state.password} required />
			     <span>{this.state.error_message}</span>
                  <div className='buttons'>
			      <CustomButton type='submit'> Sign In 
			      </CustomButton>

			      <CustomButton onClick={SignInWithGoogle} isGoogleSignIn> Sign In With Google 
			      </CustomButton>
			      </div>
			   </form>
			   
			</div>
			)
	}
}

export default SignIn;