import {gql} from "@apollo/client";

export const media = gql`
    query MyQuery {
  audioTracks {
    audioUrl {
      url
    }
    audioTitle
  }
  videos {
    videoTitle
    videoUrl {
      url
    }
  }
  residents( orderBy: residentName_DESC ) {
    residentName
    residentBio
    residentImage {
      url
    }
  }
}

`

