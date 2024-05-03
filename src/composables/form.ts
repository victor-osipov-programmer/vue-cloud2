import { toValue } from 'vue'

export function getBody(form) {
    form = toValue(form)
    const body = {}

    for (let el in form) {
        body[el] = form[el].text
    }

    return body;
}