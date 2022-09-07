const initState = {
  loading: true,
  data: []
}

export const freePhoto = (state = initState, {type, payload}) => {
  switch(type) {
    case 'GETALLFREEPHOTO': 
      return state = payload
    default: 
      return state
  }
} 