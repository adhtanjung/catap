import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ComponentType } from "react";
import PropTypes from "prop-types";

const withAuthentication = (WrappedComponent) => {
	const RequiresAuthentication = (props) => {
		const Router = useRouter();
		// get user role from redux state
		const { username } = useSelector((state) => state.user);

		useEffect(() => {
			// if a there isn't a logged in user and their role has been set to "guest"
			// then redirect them to "/signin"
			if (!username) Router.push("/");
		}, [username]);

		// if there's a loggedInUser, show the wrapped page, otherwise show a loading indicator
		return username ? <WrappedComponent {...props} /> : <div>Loading...</div>;
	};

	return RequiresAuthentication;
};

withAuthentication.propTypes = {
	WrappedComponent: PropTypes.node.isRequired,
};

export default withAuthentication;
