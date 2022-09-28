import { makeStyles } from "@mui/styles";

const styles = makeStyles({
    container:{
        padding:'0 5%',
        width:'100%',
        margin:0,
    },
    card:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        height:'45vh',
        padding:'10%',
        borderRadius:10,
        color:'black',
        backgroundColor:'#ffffff7d !important',
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'

    },
    infoCard:{
        display:'flex',
        flexDirection:'column',
        textAlign:'center'
    }
});

export default styles;