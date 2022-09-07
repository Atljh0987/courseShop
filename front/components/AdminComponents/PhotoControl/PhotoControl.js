import styles from './PhotoContol.module.css'
import { Button, Form, Image, Input, message, Modal, Radio, Skeleton, Tree, Upload  } from 'antd';
import React, { useEffect, useState } from 'react';
import { InboxOutlined, DownOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesTreeActions } from '../../../actions/CategoriesTreeActions';
import { server } from '../../../config';
import { photoActions } from '../../../actions/PhotoActions';
const { Dragger } = Upload;



const ModalUpload = ({isModalOpen, setIsModalOpen}) => {
  const dispatch = useDispatch()
  const props = {
    name: 'file',
    multiple: true,
    action: server.back + '/api/photo/upload',
  
    onChange(info) {
      const { status } = info.file;
  
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
  
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        dispatch(photoActions('GETALLFREEPHOTO'))
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
  const photoData = useSelector(state => state.freePhoto.data)
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    dispatch(categoriesTreeActions('getAllTree'))
    dispatch(photoActions('GETALLFREEPHOTO'))
  }, [dispatch])

  const showModal = () => {
    setIsModalOpen(true);
  };

  const deleteButton = (val) => {
    console.log(val)
  }

  return (
    <div>
      <div className={styles.actionContainer}>
        <Radio.Group  onChange={(val) => console.log(val)} style={{display: "flex"}}>
          {
            photoData.map((e, i) => {
              return <Form
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 14,
                }}
                layout="horizontal"
                // onValuesChange={onFormLayoutChange}
                // disabled={componentDisabled}
              >
                <Form.Item>
                  <Image
                    width={150}
                    src={e.image}
                  />
                  {/* <Button onClick={deleteButton} danger>Удалить</Button> */}
                </Form.Item>
                <Form.Item style={{display: 'flex'}}>
                  <Radio value={e.id} key={e.id}/>
                  <Button onClick={() => console.log(e.id)}>Удалить</Button>
                </Form.Item>
              </Form>
            })
          }

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
    </div>
  </>
}

export default PhotoContol