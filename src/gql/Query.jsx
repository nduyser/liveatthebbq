import {gql} from "@apollo/client";

export const media = gql`
    query MyQuery {
        videos {
            title
            link {
                url
            }
        }
        audioTracks {
            title
            audioFile {
                url
            }
        }
    }
`

