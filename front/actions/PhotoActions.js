import axios from "axios"
import { server } from "../config"

export const photoActions = (type, payload) => {
  return dispatch => {
    switch(type) {
      case 'GETALLFREEPHOTO': dispatch(getAllFreePhoto()); break;
      case 'GETFORMATERIAL': dispatch(getForMaterial(payload)); break;
      default: null
    }
  }
}

const getAllFreePhoto = () => {
  return dispatch => {
    axios.get(server.back + '/api/photo/freePhoto').then(res => {
      const data = res.data
      const dto = data.map(e => {
        return {
          id: e.id,
          image: server.back + '/api/photo/' + e.image
        }
      })
      dispatch({type: 'GETALLFREEPHOTO', payload: {loading: false, data: dto }})
    }).catch(err => {
      console.log(err)
    })
  }
}

const getForMaterial = (id) => {
  return dispatch => {
    axios.get(server.back + '/api/photo/material/' + id).then(res => {
      const data = res.data
      const dto = data.map(e => {
        return {
          id: e.id,
          image: server.back + '/api/photo/' + e.image
        }
      })
      dispatch({type: 'GETFORMATERIAL', payload: {loading: false, data: dto }})
    }).catch(err => {
      console.log(err)
    })
  }
}