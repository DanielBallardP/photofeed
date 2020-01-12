import React from 'react';
import PropTypes from 'prop-types';
import styles from './RadioButtonGroup.css';

const radioButtonGroup = props => {
    const propTypes = {
        items : PropTypes.array,
        value : PropTypes.string,
        onClick : PropTypes.func,
        type : PropTypes.string
    };

    const getItemElement = item => {
        const {value} = this.props;
        const className = value == item.value ? this.getSelectedClassName() : '';
        return (
            <a key={item.value+item.label} href="#" className={className}
               onClick={onClick(item.value)}>{item.label}</a>
        );
    };

    const getSelectedClassName = () => {
        const {type} = props;
        switch (type) {
            case 'default' :
                return styles.defaultButtonSelected;
            case 'secondary' :
                return styles.secondaryButtonSelected;
        }
    }

    const onClick = value => {
        return function () {
            props.onClick(value);
        };
    }

    const {items,type} = props;
    const itemElements = items.map(getItemElement);
    const typeStyle = type == 'default' ? '' : styles.secondaryButton;
    return (
        <div className={[styles.buttons, typeStyle].join(' ')}>
            {itemElements}
        </div>
    );
}

export default radioButtonGroup;