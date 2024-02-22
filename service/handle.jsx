const Handle = ({ status }) => {
    return(
        <div className="page-max" style={{flexDirection: 'column', gap: '30px'}}>
            {(status == 404) ? (
                <>
                <img src="/img/404.png" style={{width: '250px'}}/>
                </>
            ) : (
                <>
                <img src="/img/404.png" style={{width: '250px'}}/>
                </>
            )}
        </div>
    )
}

export default Handle;