import Toolbar from "../../components/Toolbar/Toolbar";
import Aux from '../Auxuliary/Auxuliary'

function Layout(props) {
    return (
        <Aux>
            <Toolbar/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
}

export default Layout;