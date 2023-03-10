import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import { parse, parseParticipant } from '../utils/parse'
import { Button, Col, Input, Row, Form, Card } from 'antd'
const { TextArea } = Input;

const KYB = `{
    "data": {
        "id": "n72acq_ZZTL2gGE7MhtiwuUVT7VCj_03_10",
        "status": "initiated",
        "last_updated_at": "2023-03-10T12:14:15.2043025Z",
        "initiated_at": "2023-03-10T12:14:15.20430244Z",
        "is_acknowledged": false,
        "details": [
            {
                "key": "state",
                "value": "West Bengal",
                "status": "initiated",
                "parent": "company_owners[0]",
                "message": null,
                "id": "8LEM3oN9hQYhoqWR9M25YD_03_10"
            },
            {
                "key": "ein",
                "value": "844161999",
                "status": "initiated",
                "parent": "company_details",
                "message": null,
                "id": "8XqZCSptpw5eQpay7KNdpH_03_10"
            },
            {
                "key": "phone_number",
                "value": "919740623666",
                "status": "initiated",
                "parent": "company_owners[0]",
                "message": null,
                "id": "9epqCPDZ7Lehq4Tu9hc7MN_03_10"
            },
            {
                "key": "city",
                "value": "Howrah",
                "status": "initiated",
                "parent": "company_owners[0]",
                "message": null,
                "id": "9i4krpqa4MuQ32JDEGQLg9_03_10"
            },
            {
                "key": "email",
                "value": "ritesh@pixis.ai",
                "status": "initiated",
                "parent": "company_owners[0]",
                "message": null,
                "id": "G7wLuHm5MXqFFcC9RgXLvR_03_10"
            },
            {
                "key": "address1",
                "value": "84 Bhairab Dutta Lane",
                "status": "initiated",
                "parent": "company_owners[0]",
                "message": null,
                "id": "HCcjm8xsphhppJov6aSRDC_03_10"
            },
            {
                "key": "legal_business_name",
                "value": "Aiquire Inc.",
                "status": "initiated",
                "parent": "company_details",
                "message": null,
                "id": "KUDr6SNnMsWJx4ksXf9iHf_03_10"
            },
            {
                "key": "owner_profile",
                "value": "CFO",
                "status": "initiated",
                "parent": "company_owners[0]",
                "message": null,
                "id": "L38H6gL9v92hGD7mqx3bR9_03_10"
            },
            {
                "key": "city",
                "value": "Chicago",
                "status": "initiated",
                "parent": "company_address",
                "message": null,
                "id": "P22z2KL4YAqnvZ326JrZUk_03_10"
            },
            {
                "key": "last_name",
                "value": "Agarwal",
                "status": "initiated",
                "parent": "company_owners[0]",
                "message": null,
                "id": "WUP8zux3PyDtjwHb9qA4mM_03_10"
            },
            {
                "key": "passport_document",
                "value": "https://storage.googleapis.com/zamp-prd-sg-banking-documents/Passport%20%281%29%20%282%29_FhjiuV5RMDjaKic5mS84MP_03_10.pdf?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=zamp-prd-sg-banking%40production-351109.iam.gserviceaccount.com%2F20230310%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20230310T143029Z&X-Goog-Expires=899&X-Goog-Signature=292e3f61b702185b63d06f2139ed12d7c6454a2265f74718a5312d1250d6fb99528e29b17364a4a7efd04ec12867caee35caf961f93c0f58b0f025ee5f9b2f2b7c2cdf87f653bf822c200b6de0c876ef979cb077344ac2514cb7c0de70435726b4a73782a63c5c7b5e9e12a278c9cbfa86475000659b14475ab1de39c6833e7935cdee8c1a674410fbdf86f92c9b9ede9b41268a25d5d8a38acddae5b77bdff7b0239a5e34db6f5921d435baf22d1ba626e88cf935fac7e67b2e0dff0687c1ec6478076ab02c40199a0c9ab2270ff7127bc00808cd3de202b0ac6239d8f0e8c74d12961a3bbdf3134e73eeaef1966d7f5b378b89382700e47d49cde83e02649b&X-Goog-SignedHeaders=host",
                "status": "initiated",
                "parent": "company_owners[0]",
                "message": null,
                "id": "Y9zTjKyrnV23kjtMmvD8EK_03_10"
            },
            {
                "key": "document",
                "value": "https://storage.googleapis.com/zamp-prd-sg-banking-documents/COI%20%26%20Delware%20Good%20Standing_VUAvTajFGMU2KdYjUnbtr6_03_10.pdf?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=zamp-prd-sg-banking%40production-351109.iam.gserviceaccount.com%2F20230310%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20230310T143029Z&X-Goog-Expires=899&X-Goog-Signature=1cdd793bced62d5838dbf995a6c1aa462c7f80c68852148ff7fd742e8d974d3fa8866be9cd66895ade0b82788758d2303b38fc63f5cb9dc6ccc66edf41c8866059a4c58262265c8d2d639c9bc31f5c8d27be2f33a9d97049ec4276a32057dcfbb46d735e69f0b0b0298de0ed5ef25017996d8e67f44ee85a4d24c8950153ff3e470a06ee14a728e0b473cf27028e27c02ee807fa03b06a1660badcb3ef80a36e63839c167b4b6c75351bb46170149fb1519e800f64b606898ec6418c783394d2dc3dca3e39293d9b45776bb87b6ef785b247490e3344fd8de705be78d528e308a94fdf13ef844b6df798bf6768f095d60c13a9b2ea49aa744acfa5e7a2a897df&X-Goog-SignedHeaders=host",
                "status": "initiated",
                "parent": "business_document",
                "message": null,
                "id": "a3qbx6FotnXzUkUP3wpZ4C_03_10"
            },
            {
                "key": "ownership_percentage",
                "value": "0",
                "status": "initiated",
                "parent": "company_owners[0]",
                "message": null,
                "id": "ai5U7SrrwPKeZCvGr4ti4A_03_10"
            },
            {
                "key": "first_name",
                "value": "Ritesh ",
                "status": "initiated",
                "parent": "company_owners[0]",
                "message": null,
                "id": "aiXxYKdYn2554oNCojgef4_03_10"
            },
            {
                "key": "source_of_funds",
                "value": "Series C Fundraise",
                "status": "initiated",
                "parent": "company_details",
                "message": null,
                "id": "cvgdgCd9ddrn6ZEVh6cyLd_03_10"
            },
            {
                "key": "null",
                "value": "",
                "status": "initiated",
                "parent": "business_document",
                "message": null,
                "id": "d9ki2zbAAKjKaiNE5CtEZn_03_10"
            },
            {
                "key": "zip_code",
                "value": "711106",
                "status": "initiated",
                "parent": "company_owners[0]",
                "message": null,
                "id": "dadzQLzSsDScU4n7T2jHKc_03_10"
            },
            {
                "key": "website",
                "value": "https://pixis.ai/",
                "status": "initiated",
                "parent": "company_details",
                "message": null,
                "id": "djRz6237jWMMVsQAkFwhxJ_03_10"
            },
            {
                "key": "document_type",
                "value": "Certificate of Formation",
                "status": "initiated",
                "parent": "business_document",
                "message": null,
                "id": "e76HPy5upQdByYdHh8FmQY_03_10"
            },
            {
                "key": "company_name",
                "value": "Pixis.Ai",
                "status": "initiated",
                "parent": "company_details",
                "message": null,
                "id": "faRa4Dz9LqLoKisPYCXeS_03_10"
            },
            {
                "key": "industry_type",
                "value": "Other",
                "status": "initiated",
                "parent": "company_details",
                "message": null,
                "id": "i5un3CihrC3cUtnAHPwRRd_03_10"
            },
            {
                "key": "country",
                "value": "US",
                "status": "initiated",
                "parent": "company_address",
                "message": null,
                "id": "iweGiMxoi9a6b5hAcx9io_03_10"
            },
            {
                "key": "tax_identification_document",
                "value": "https://storage.googleapis.com/zamp-prd-sg-banking-documents/Aiquire%20Inc_EIN_updated_pHhPhMV3VckbAFcAiGX8Hg_03_10.pdf?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=zamp-prd-sg-banking%40production-351109.iam.gserviceaccount.com%2F20230310%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20230310T143029Z&X-Goog-Expires=899&X-Goog-Signature=43f3c87b5d40ad64aee2a290cf12791d27910e4b78869e91f5e40e4ab4261de26a51cfb15536ca0e6dbe0ce6a9f77226bb74e3e0b70e22b675cc379d5f7c399a263ddbc7702ecae3670276ab668fb5f18f7e10fb36d0b26b931ebb5ad027d41b333ef9cd2ffb2a291d95c835c9f1c7904b9139e34ef6fc6afa792dd0f0943a56d458701430a605b5a1976cdf109cc257d8688d7a310d566ef649e193c4eea3f1a55d3732946658e5e30070bc9d89c5a1e2c424bc59c5c084ffc9a78ffa0d60210741dad28cf8383f3627a4d95329df481d0b6a03b5b1e42d654ac5dee2d123232c76aff49e4b55f2942136681fab6b4ac1dbda7e5f9cbc8f4bdd66b13591b0af&X-Goog-SignedHeaders=host",
                "status": "initiated",
                "parent": "company_owners[0]",
                "message": null,
                "id": "jmxk6EkFfWG55gzrDgYN8U_03_10"
            },
            {
                "key": "address1",
                "value": "625, W Adams ST",
                "status": "initiated",
                "parent": "company_address",
                "message": null,
                "id": "kG5ZuV9mHtDXDJ2t9VEZfM_03_10"
            },
            {
                "key": "phone_number",
                "value": "919740623666",
                "status": "initiated",
                "parent": "company_details",
                "message": null,
                "id": "nTF9wiHtdiJ9p7kUhy75MU_03_10"
            },
            {
                "key": "zip_code",
                "value": "60661",
                "status": "initiated",
                "parent": "company_address",
                "message": null,
                "id": "obpyfcthiPsm4eU2CWPSiN_03_10"
            },
            {
                "key": "null",
                "value": "",
                "status": "initiated",
                "parent": "company_owners[0]",
                "message": null,
                "id": "pYciHoDFHe5MDW7zcz5A4J_03_10"
            },
            {
                "key": "email",
                "value": "ritesh@pixis.ai",
                "status": "initiated",
                "parent": "company_details",
                "message": null,
                "id": "prSusKcKd7qRBrn8iZJPf_03_10"
            },
            {
                "key": "date_of_birth",
                "value": "1990-12-12",
                "status": "initiated",
                "parent": "company_owners[0]",
                "message": null,
                "id": "s8afv5mBvuhxkWP9YQrcnY_03_10"
            },
            {
                "key": "state",
                "value": "Illinois",
                "status": "initiated",
                "parent": "company_address",
                "message": null,
                "id": "sLua4kezCgcMiqen8qzz9K_03_10"
            },
            {
                "key": "date_of_formation",
                "value": "2020-01-02",
                "status": "initiated",
                "parent": "company_details",
                "message": null,
                "id": "t9XpeeNjgH7zJweuiLyBM3_03_10"
            },
            {
                "key": "country",
                "value": "IN",
                "status": "initiated",
                "parent": "company_owners[0]",
                "message": null,
                "id": "vn67SsNwqswXem4DAoNpth_03_10"
            },
            {
                "key": "business_type",
                "value": "C Corporation",
                "status": "initiated",
                "parent": "company_details",
                "message": null,
                "id": "yyLfd2EjhY74sLm47nqBkF_03_10"
            }
        ]
    }
}`

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const parseDetails = (values: any) => {
    console.log(values.details)
    if (values.details == undefined) {
      return
    }
    const kyb = parse(JSON.parse(values.details))
    const participant = parseParticipant(JSON.parse(values.details))

    const pDom = document.getElementById("participant")
    const kDom = document.getElementById("corporate")
    if (document || kDom != null) {
      kDom!.innerHTML = JSON.stringify(kyb, null, 2)
    }
    if (document || pDom != null) {
      pDom!.innerHTML = JSON.stringify(participant, null, 2)
    }

  }


  return (
    <>
      <Head>
        <title>Automate</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ padding: '10px' }}>
        <Col span={24}>
          <Row>
            <Col span={12}>
              <Form
                onFinish={parseDetails}
              >
                <Form.Item
                  name="details"
                >
                  <TextArea style={{ width: '100%', height: '80vh' }} rows={4} placeholder="Enter KYB details here" />
                </Form.Item>
                <Row justify='center' style={{ paddingTop: '10px' }}>
                  <Form.Item >
                    <Button type="primary" htmlType="submit" size='large' style={{ width: '200px' }} onClick={parseDetails} >Convert</Button>
                  </Form.Item>
                </Row>
              </Form>

            </Col>
            <Col span={12} style={{ padding: '20px', overflow: 'scroll', height: '100vh' }}>
              <Card title="Corporate" bordered={false} >
                <pre id='corporate'>
                </pre>
              </Card>
              <Card title="Participant" bordered={false} >
                <pre id='participant'>
                </pre>
              </Card>
            </Col>
          </Row>
        </Col>
      </main>
    </>
  )
}
