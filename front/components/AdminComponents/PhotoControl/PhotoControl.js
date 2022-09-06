import styles from './PhotoContol.module.css'
import { Button, Image, message, Modal, Radio, Skeleton, Tree, Upload  } from 'antd';
import React, { useEffect, useState } from 'react';
import { InboxOutlined, DownOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesTreeActions } from '../../../actions/CategoriesTreeActions';
const { Dragger } = Upload;



const ModalUpload = ({isModalOpen, setIsModalOpen}) => {
  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  
    onChange(info) {
      const { status } = info.file;
  
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
  
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal title="Загрузка" visible={isModalOpen} onCancel={handleCancel} footer={[]}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
            band files
          </p>
        </Dragger>
      </Modal>
    </>
  );
};

const PhotoContolAdder = () => {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const allCategories = useSelector(state => state.allTreeCategory.data)
  const loading = useSelector(state => state.allTreeCategory.loading)

  useEffect(() => {
    dispatch(categoriesTreeActions('getAllTree'))
  }, [dispatch])

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <div style={{marginBottom: "15px", width: "50%", overflow: "scroll"}}>
        <Radio.Group  buttonStyle="solid" onChange={(val) => console.log(val)} style={{display: "flex"}}>
          <div className={styles.radio}>
            <Image
                width={150}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            <Radio value={1}/>
          </div>
          <div className={styles.radio}>
            <Image
                width={150}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            <Radio value={2}/>
          </div>
          <div className={styles.radio}>
            <Image
                width={150}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            <Radio value={2}/>
          </div><div className={styles.radio}>
            <Image
                width={150}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            <Radio value={2}/>
          </div><div className={styles.radio}>
            <Image
                width={150}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            <Radio value={2}/>
          </div><div className={styles.radio}>
            <Image
                width={150}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            <Radio value={2}/>
          </div><div className={styles.radio}>
            <Image
                width={150}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            <Radio value={2}/>
          </div><div className={styles.radio}>
            <Image
                width={150}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            <Radio value={2}/>
          </div><div className={styles.radio}>
            <Image
                width={150}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            <Radio value={2}/>
          </div><div className={styles.radio}>
            <Image
                width={150}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            <Radio value={2}/>
          </div><div className={styles.radio}>
            <Image
                width={150}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            <Radio value={2}/>
          </div><div className={styles.radio}>
            <Image
                width={150}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            <Radio value={2}/>
          </div><div className={styles.radio}>
            <Image
                width={150}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            <Radio value={2}/>
          </div><div className={styles.radio}>
            <Image
                width={150}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            <Radio value={2}/>
          </div><div className={styles.radio}>
            <Image
                width={150}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            <Radio value={2}/>
          </div>
        </Radio.Group>        
      </div>
    <div style={{marginBottom: "15px"}}>
      <ModalUpload isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
      <Button type="primary" onClick={showModal} style={{marginRight: "10px"}}>
        Загрузить фото
      </Button>
      <Button type="primary" /*onClick={showModal}*/>
        Сохранить
      </Button>
    </div>
    <div>
      {loading? <Skeleton /> 
      : <Tree
        showLine
        switcherIcon={<DownOutlined />}
        onSelect={() => console.log(123)}
        treeData={allCategories}
      />}
      
    </div>
  </div>)
}

const PhotoContol = () => {
  return <>
    <div className={styles.container}>
      <PhotoContolAdder/>
      <h1>asdf</h1>
    </div>
  </>
}

export default PhotoContol