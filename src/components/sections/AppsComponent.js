import { React, Component } from 'react';
import { withStyles } from '@material-ui/styles';
import FullScreenDialog from '../FullScreenDialog.js';
import firebase from 'firebase/app';
import 'firebase/storage';

const styles = theme => ({
    root: {
        padding: '8px'
    }
});

const storage = firebase.storage().ref();

class AppsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            data: []
        }
        this.title = "Apps";
        // this.getImage();
    }

    displayImage(imageRef) {
        imageRef.getDownloadURL().then((url) => {
            this.setState({ data: [...this.state.data, url] });
        }).catch((error) => {
            console.log(error)
        })
    }

    getImage(image) {
        let storageRef = storage.child('Apps').listAll();
        storageRef.then((result) => {
            result.items.forEach((ref) => {
                this.displayImage(ref);
            })
        });
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    };

    handleOpen = () => {
        this.setState({
            open: true
        })
    }

    child = () => {
        return this.state.data.map((e, i) => {
            console.log(e);
            return <a href={e} target='_blank' rel="noreferrer">
                <img src={e} className="wallpaper" />
            </a>
        });
    }

    mainContent = () => {
        return <div className="wallpaperGrid">
            Work in Progress
        </div>
    }

    render() {
        return <>
            <div className={this.props.classList} onClick={() => this.handleOpen()}>
                {this.title}
            </div>
            <FullScreenDialog title={this.title} titleColor="#f1608a"
             childComponent={this.mainContent()} open={this.state.open} handleClose={this.handleClose} />
        </>;
    }
}

export default withStyles(styles)(AppsComponent);
