import axios from 'axios'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.inc(0.4)
NProgress.configure({ easing: 'ease', speed: 1000, showSpinner: false })

axios.interceptors.request.use(function(config){
    NProgress.start()

    return config
})

axios.interceptors.response.use(function(config){

    NProgress.done()
    return config
})