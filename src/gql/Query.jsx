import {gql} from "@apollo/client";

export const media = gql`
    query Videos {
        videos {
            title
            link {
                url
            }
        }
        mediaElements {
            elementTitle
            elementUrl {
                url
            }
        }
    }
`

