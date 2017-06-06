module.exports = function autoMasterwork(dispatch)
{
    let masterworkTries = 1;
    let enabled = false;
    
	dispatch.hook('C_CHAT', 1, event => {
		if(event.message.includes('!mw'))
        {
            if(enabled == false)
                enabled = true;
            else
                enabled = false;
            return false;
		}
	})
    
    dispatch.hook('S_ITEM_IDENTIFY_RESULT', 1, event => {
        if(event.masterwork == false && enabled == true)
        {
            masterworkTries++;
            setTimeout(masterwork, 100);
        }
        if(event.masterwork == true && enabled == true)
        {
            message(); 
        }
    })
    
    function masterwork()
    {
        dispatch.toServer('C_UNIDENTIFY_EXECUTE', 1, {})
    }
    
    function message() 
    {
        dispatch.toClient('S_CHAT', 1, {
            channel: 24,
            authorID: 0,
            unk1: 0,
            gm: 0,
            unk2: 0,
            authorName: '',
            message: 'Your item took' + masterworkTries + ' tries to masterwork.'
	})
    }
}
