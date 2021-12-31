import React, {useState} from 'react'
import { Display } from './Display'
import { Icons } from './Icons'
import { Icon } from './Icon.types'


export const Toolbox = () => {

    const [selectedIcon, setSelectedIcon] = useState<Icon | null>(null)

    return (
        <div>
            <Icons icon={selectedIcon} setIcon={setSelectedIcon}/>
            <Display selectedIcon={selectedIcon}/>
        </div>
    )
}