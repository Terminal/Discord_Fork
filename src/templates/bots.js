import React from 'react';
import Global from './../components/Global'
import SiteLayout from './../components/SiteLayout'
import ProfileCard from './../components/ProfileCard'
import Cards from './../components/Cards'
import { FormattedMessage } from 'react-intl'
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
      <div className="center">
        { frontmatter.link ? <a className="btn white black-text bold" href={frontmatter.link}>
          <FormattedMessage id="pages.bots.invite" />
        </a> : null }
        { frontmatter.support ? <a className="btn white black-text bold" href={frontmatter.support}>
          <FormattedMessage id="pages.items.discord" />
        </a> : null }
        { frontmatter.github && frontmatter.github.owner ? <a className="btn white black-text bold" href={`https://github.com/${frontmatter.github.owner}/${frontmatter.github.repo || ''}`}>
          <FormattedMessage id="pages.items.github" />
        </a> : null }
      </div>
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
        link
        support
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
