import axios from "axios"
import { server } from "../config"

export const categoriesTreeActions = (type, payload) => {
  return dispatch => {
    switch(type) {
      case 'getAllTree': dispatch(getAll()); break;
      default: null;
    }
  }
}

const getAll = () => {
  return dispatch => {
    axios.get(server.back + '/api/category/allTree').then(res => {
      const data = res.data
      const dto = data.map(e => {
        return {
          title: e.name,
          key: e.id,
          selectable: false,
          children: e.subCategories.map(e2 => {
            return {
              title: e2.name,
              key: e.id + '-' + e2.id,
              selectable: false,
              children: e2.materials.map(e3 => {
                return {
                  title: e3.name,
                  key: e.id + '-' + e2.id + '-' + e3.id,
                  isLeaf: true
                }
              })
            }
          })
        }
      })
      dispatch({type: 'GETALLTREECATEGORY', payload: {loading: false, data: dto}})
    }).catch(err => {
      console.log(err)
    })
  }
}