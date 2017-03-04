import rules from './rules';
import Form from './components/Form/Form';
import Base from './components/Base/Base';
import Input from './components/Input/Input';
import Select from './components/Select/Select';
import Textarea from './components/Textarea/Textarea';
import Button from './components/Button/Button';
import inputFactory from './factories/inputFactory';
import selectFactory from './factories/selectFactory';
import textareaFactory from './factories/textareaFactory';

export default {
    rules,
    components: {
        Base,
        Form,
        Input,
        Select,
        Textarea,
        Button
    },
    factories: {
        inputFactory,
        selectFactory,
        textareaFactory
    }
};
