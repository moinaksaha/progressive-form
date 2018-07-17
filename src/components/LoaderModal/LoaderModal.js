/*
	=========================================================
	COMPONENT NAME: LoaderModal
	FUNCTION: Returns the loader (Modal) component of the page
	PROPS:  showState -> prop to show or hide the modal
	=========================================================
*/

import React, { Component } from 'react'

// React-Bootstrap imports
import { Modal, Image } from 'react-bootstrap'

// Import styles from the 'LoaderModal.css' file
import styles from './LoaderModal.css';

// Import the loadingInProgress image
let loaderImage = require('../../images/loadingInProgress.gif');

export default class LoaderModal extends Component {

  // constructor() {
  //   super();
  // }

  render = () => {

    const { showState } = this.props;

    // handles whether to show the modal or not
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