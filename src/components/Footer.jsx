import {decode} from "html-entities";
import moment from "moment";

export default function Footer() {
    return (
        <footer className='footer'>{decode('&#169;')} {moment().year()} {decode('&#35;VanLife')}</footer>
    )
}