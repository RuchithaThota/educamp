
function Divider() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
        }}>
            <div style={{
                flex: 1,
                backgroundColor: 'lightgrey',
                height: '0.5px'
            }}></div>
            <span style={{
                paddingInline: '10px',
                color: '#808e9d',
                flexShrink: 0
            }}>or</span>
            <div style={{
                flex: 1,
                backgroundColor: 'lightgrey',
                height: '0.5px'
            }}></div>
        </div>
    )
}

export default Divider