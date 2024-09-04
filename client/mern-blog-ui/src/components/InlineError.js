import { MESSAGES } from '../MsgConstants';

export default function InlineError({group, errorType, PrefixMsg, SuffixMsg, active}) {
    if(!active)
        return '';
    return (
       <div>
        {PrefixMsg}
        {MESSAGES[group][errorType]}
        {SuffixMsg}
       </div>
    )
}