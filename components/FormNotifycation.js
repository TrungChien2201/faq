import {
  Select,
  Card,
  Checkbox,
  FormLayout,
  TextField,
} from "@shopify/polaris";
import draftToHtml from "draftjs-to-html";
import dynamic from "next/dynamic";
import { optionFormNotifycationStatus } from "../constants";
import CustomFieldFormLabel from "./CustomFieldFormLabel";

const descriptionEditor = `Enter the text that will be sent as notification email for pending testimonial. HTML is accepted. Available template tags are:\n
{name} - The reviewer's full name.\n
{email} - The reviewer's email address.\n
{position} - The reviewer's position.\n
{company_name} - The reviewer's company name.\n
{location} - The reviewer's location address.\n
{phone} - The reviewer's phone number.\n
{website} - The reviewer's company website URL.\n
{video_url} - The reviewer's video URL.\n
{testimonial_title} - Testimonial title.\n
{testimonial_text} - Testimonial content.\n
{groups} - Testimonial groups.\n
{rating} - Testimonial rating.\n`;
const Editor = dynamic(
  () => {
    return import("react-draft-wysiwyg").then((mod) => mod.Editor);
  },
  { ssr: false }
);
export default function FormNotifycation({
  formik,
  handleChange,
  editorState,
  setEditorState,
}) {
  const handleChangeContent = (e) => {
    formik.handleChange({
      target: { id: "submission_email_body", value: draftToHtml(e) },
    });
  };

  const onEditorStateChange = (e) => {
    setEditorState(e);
  };

  return (
    <Card.Section>
      <FormLayout>
        <CustomFieldFormLabel
          label="Testimonial Status"
          helpText="Select testimonial approval status for the front-end form submission."
        >
          <Select
            id="testimonial_approval_status"
            name="testimonial_approval_status"
            options={optionFormNotifycationStatus}
            onChange={handleChange}
            value={formik.values.testimonial_approval_status}
          />
        </CustomFieldFormLabel>
        <CustomFieldFormLabel
          label="Email Notification"
          helpText="Email notification for a new testimonial."
        >
          <Checkbox
            id="submission_email_notification"
            name="submission_email_notification"
            onChange={handleChange}
            checked={formik.values.submission_email_notification}
          />
        </CustomFieldFormLabel>
        <div>
          {formik.values.submission_email_notification && (
            <div style={{ paddingTop: "10px" }}>
              <FormLayout>
                <CustomFieldFormLabel
                  label="Email Notification Subject"
                  helpText="Type subject for the email notification."
                >
                  <TextField
                    id="submission_email_subject"
                    name="submission_email_subject"
                    onChange={handleChange}
                    value={formik.values.submission_email_subject}
                  />
                </CustomFieldFormLabel>
                <CustomFieldFormLabel
                  label="Email Notification Heading"
                  helpText="Type heading for the email notification."
                >
                  <TextField
                    id="submission_email_heading"
                    name="submission_email_heading"
                    onChange={handleChange}
                    value={formik.values.submission_email_heading}
                  />
                </CustomFieldFormLabel>
                <CustomFieldFormLabel
                  fullWidth={true}
                  label="Email Notification Body"
                >
                  <Editor
                    placeholder="Enter Content"
                    editorState={editorState}
                    onChange={handleChangeContent}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editor-faq"
                    onEditorStateChange={onEditorStateChange}
                  />
                  <div
                    className="form-input-description"
                    style={{ wordBreak: "break-all", whiteSpace: "pre-line" }}
                  >
                    {descriptionEditor}
                  </div>
                </CustomFieldFormLabel>
                <div style={{ paddingTop: "10px" }}>
                  <CustomFieldFormLabel
                    fullWidth={true}
                    label="Email(s) to Notify"
                  >
                    <TextField
                      multiline={4}
                      autoComplete={false}
                      id="submission_email_notification_to"
                      name="submission_email_notification_to"
                      onChange={handleChange}
                      value={formik.values.submission_email_notification_to}
                    />
                  </CustomFieldFormLabel>
                </div>
              </FormLayout>
            </div>
          )}
        </div>
      </FormLayout>
    </Card.Section>
  );
}
