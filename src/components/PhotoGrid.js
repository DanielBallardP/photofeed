import React, {useState} from "react";
import PropTypes from "prop-types";
import styles from "./PhotoGrid.css";
import {DefaultInfoElement} from "./DefaultInfoElement";

const photoGrid = props => {
    const propTypes = {
        photos : PropTypes.array,
        columns : PropTypes.number,
        InformationElement : PropTypes.func
    };

    const [fullScreenImage, setFullScreenImage] = useState(null);
    const [fullScreenImageIndex, setFullScreenImageIndex] = useState(null);

    const getGridElements = () => {
        const {photos}  = this.props;
        const classNames = this.isShowInfo() ? [styles.imageGridItem, styles.column1] : [styles.imageGridItem];
        const style = this.isShowInfo() ? {} : {width : this.getPercentWidth() + '%'};

        return photos.map((photo, index) => (
            <div className={classNames.join(' ')}
                 style={style}
                 key={photo.id}>
                {this.getImageElement(photo, index)}
            </div>

        ));
    }

    const getImageElement = (photo, index) => {
        const InformationElement = this.props.InformationElement ? this.props.InformationElement : DefaultInfoElement;
        const classNames = this.isShowInfo() ? [styles.imageWrapper, styles.column1Image] : [styles.imageWrapper];
        const style = {backgroundImage : `url(${photo.src})`};

        return (
            <div >
                <div className={classNames.join(' ')}
                     onClick={this.image_clickHandler(photo, index)}
                     style={style}>
					<a href="#">{photo.title}</a>
                </div>
                {this.isShowInfo() ? <InformationElement photo={photo}/> : null }

            </div>
        );
    };

    const getFullScreenImage = src => {
        const classNames = src ? [styles.lightbox] : [styles.hide, styles.lightbox ];
		const {photos}  = this.props;
		return (
            <a href="#_" className={classNames.join(' ')} onClick={this.lightBox_clickHandler}>
				{photos.map((photo, index) => (
					<img key={photo.id} src={photo.bigSrc} className={photo.bigSrc == src ? 'opaque' : ''}
						 onClick={photo.bigSrc == src ? this.fullScreenImage_clickHandler : null}/>
				))}
			</a>);
    };


    const image_clickHandler = (photo, index) => () => {
        setFullScreenImage(photo.bigSrc);
        setFullScreenImageIndex(index);
    };

	const lightBox_clickHandler = e => {
        if (e.target.tagName.toUpperCase() == 'IMG') return;
        setFullScreenImage(null);
        setFullScreenImageIndex(null);
    };

	const fullScreenImage_clickHandler = e => {
		e.stopPropagation();
		const {fullScreenImageIndex} = this.state;
		const nextPhotoIndex = this.getNextPhotoIndex(fullScreenImageIndex);
        const nextPhoto      = this.getPhoto(nextPhotoIndex);
        
        setFullScreenImage(nextPhoto ? nextPhoto.bigSrc : null);
        setFullScreenImageIndex(nextPhotoIndex);
    };

    const isShowInfo = () => this.props.columns == 1;
    const getPercentWidth = () => 100 / this.props.columns - 1;
    const getNextPhotoIndex = currentIndex => this.props.photos.length > currentIndex + 1 ? currentIndex + 1  : 0;
    const getPreviousPhotoIndex = currentIndex => currentIndex - 1 >= 0 ? currentIndex - 1  : this.props.photos.length - 1;
    const getPhoto = index => this.props.photos.length > index ? this.props.photos[index] : null;

    return (
        <div >
            {this.getGridElements()}
            {this.getFullScreenImage(this.state.fullScreenImage)}
        </div>
    );
};

export default photoGrid;