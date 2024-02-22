const Handle = ({ status }) => {
    return(
        <div className="page-max" style={{flexDirection: 'column', gap: '30px'}}>
            {(status == 404) ? (
                <>
                <img src="/img/404.png" style={{width: '250px'}}/>
                <div className="title" style={{fontSize: '1.4rem'}}>Unexpected error</div>
                </>
            ) : (
                <>
                <img src="/img/404.png" style={{width: '250px'}}/>
                <div className="title" style={{fontSize: '1.4rem'}}>Unexpected error</div>
                </>
            )}
        </div>
    )
}

export default Handle;