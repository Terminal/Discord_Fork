import React from 'react';
import Global from './../components/Global'
import SiteLayout from './../components/SiteLayout'
import ProfileCard from './../components/ProfileCard'
import Cards from './../components/Cards'
import { graphql } from "gatsby"

import './bots.scss'

export default ({data, pageContext}) => {
  const { markdownRemark } = data;
  const { frontmatter, fields, html } = markdownRemark;
  return (
    <SiteLayout locale={pageContext.locale}>
      <Global title={frontmatter.pagename} description={frontmatter.description} image={`/userassets/${fields.template}/${fields.filename}-256.png`} />
      <Cards>
        <ProfileCard post={{ frontmatter, fields }}></ProfileCard>
      </Cards>
      <div className="custom-content" dangerouslySetInnerHTML={{ __html: html }}></div>
    </SiteLayout>
  )
};

export const pageQuery = graphql`
  query BotPages($filelink: String!) {
    markdownRemark(fields: { filelink: { eq: $filelink }}) {
      html
      frontmatter {
        pagename
        avatar
        description
        nsfw
        github {
          owner
          repo
        }
      }
      fields {
        filename
        template
        filelink
      }
    }
  }
`
