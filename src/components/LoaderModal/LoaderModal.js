import React, { Component } from 'react'
import { Modal, Image } from 'react-bootstrap'

import styles from './LoaderModal.css';

let loaderImage = require('../../images/loadingInProgress.gif');

export default class LoaderModal extends Component {

  constructor() {
    super();
  }

  render = () => {

    const { showState } = this.props;

    const modalShowState = (showState) ? true : false ;

    return (

        <Modal show={modalShowState} 
                className={`${styles.mainLoader}`} 
                dialogClassName={`${styles.modalDialog} text-center center-block`}
                backdrop='static'
                animation={false}>

            <Image src={loaderImage}
                className={`${styles.imageGif}`}/>

            <div className={`${styles.loadingText} ${styles.mt10} center-block`}>
                Brace yourself! Form is submitting ...
            </div>

        </Modal>

    )
  }

}