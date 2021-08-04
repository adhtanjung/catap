import withAuthentication from "../components/WithAuth";
const test = () => {
	return <h1>HELLO test</h1>;
};
export default withAuthentication(test);
