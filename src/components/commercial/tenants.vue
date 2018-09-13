<!--商家入驻-->
<template>
    <div class="tenants">
        <p class="tenants_title">商城后台系统</p>
        <div class="a_link">
            <a href="#">&nbsp;&nbsp;&nbsp;时间商城</a>/
            <a href="#">{{person_commoney}}入驻</a>
        </div>
        <div class="form_tenants">
            <div>
                <p class="tenants_person" @click="personComponey">&nbsp;&nbsp;&nbsp;{{person_commoney}}请点击此处申请>></p>
                <!--<div class="container" style="height: 700px;overflow-y: scroll">-->
                    <el-scrollbar style="height:850px;">
                        <div class="container" style="border: none">
                            <div class="form-box">
                                <el-form ref="form" :rules="rules" :model="form" label-width="150px">
                                    <el-form-item label="商户名称:" prop="commercialName">
                                        <el-input v-model="form.commercialName" placeholder="请输入不超过20个字" maxlength="20"></el-input>
                                    </el-form-item>
                                    <el-form-item label="联系人" prop="linkName">
                                        <el-input v-model="form.linkName" placeholder="请输入联系人姓名" maxlength="20"></el-input>
                                    </el-form-item>


                                    <el-form-item label="收款人" prop="moneyPerson">
                                        <el-input v-model.number="form.moneyPerson" type="number" placeholder="请输入单位建议售价，即删除线价格" maxlength="20" onkeypress='return(/[\d]/.test(String.fromCharCode(event.keyCode)))'></el-input>
                                    </el-form-item>
                                    <el-form-item label="银行卡号" prop="bankNo">
                                        <el-input v-model="form.bankNo"></el-input>
                                        <p class="bank_word">(用于商城结算收款，请谨慎填写)</p>
                                    </el-form-item>
                                    <el-form-item v-if="form.commercialType === 'corporate'" label="营业执照名称" prop="specification">
                                        <el-input v-model="form.specification"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="form.commercialType === 'corporate'"  label="统一社会信用代码" prop="creditCode">
                                        <el-input v-model="form.creditCode"></el-input>
                                    </el-form-item>

                                    <el-form-item v-if="form.commercialType === 'corporate'"  label="营业执照（副本）" prop="licenseImgPath">
                                        <div class="el-upload-collect" style="height: 100px">
                                            <div class="el-upload-right" style="left: 0">
                                                <el-upload
                                                    class="avatar-uploader"
                                                    v-bind:action= "uploadUrl"
                                                    name="files"
                                                    :show-file-list="false"
                                                    :on-preview="handlePictureCardPreview"
                                                    :on-remove="handleRemove"
                                                    :on-success="handleAvatarSuccess"
                                                    :before-upload="beforeAvatarUpload">
                                                    <img v-if="imageUrl" :src="imageUrl" class="avatar" style="width: 100%;height: 100%">
                                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                                </el-upload>
                                            </div>
                                        </div>
                                    </el-form-item>



                                    <div class="allCardImg">
                                        <div class="linecard">
                                            <el-form-item label="法定代表人证件照片" prop="cardFrontImgPath">
                                                <div class="el-upload-collect" style="height: 100px">
                                                    <div class="el-upload-right" style="left: 0">
                                                        <el-upload
                                                            class="avatar-uploader"
                                                            v-bind:action= "uploadUrl"
                                                            name="files"
                                                            :show-file-list="false"
                                                            :on-preview="handlePictureCardPreview"
                                                            :on-remove="handleRemove"
                                                            :on-success="handleAvatarSuccessCard"
                                                            :before-upload="beforeAvatarUpload">
                                                            <img v-if="cardimageUrl" :src="cardimageUrl" class="avatar" style="width: 100%;height: 100%">
                                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                                        </el-upload>

                                                        <label class="photo_word" v-show="card">身份证正面照</label>
                                                    </div>
                                                </div>
                                            </el-form-item>
                                        </div>

                                    <div class="cardFimg">
                                    <el-form-item prop="cardBackImgPath">
                                        <div class="el-upload-collect" style="height: 100px;position: absolute;left: 200px;width: 0;">
                                            <div class="el-upload-right" style="left: 15%">
                                                <el-upload
                                                    class="avatar-uploader"
                                                    v-bind:action= "uploadUrl"
                                                    name="files"
                                                    :show-file-list="false"
                                                    :on-preview="handlePictureCardPreview"
                                                    :on-remove="handleRemove"
                                                    :on-success="handleAvatarSuccessCardF"
                                                    :before-upload="beforeAvatarUpload">
                                                    <img v-if="cardfimageUrl" :src="cardfimageUrl" class="avatar" style="width: 100%;height: 100%">
                                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i >
                                                </el-upload>
                                                <label class="photo_word"  v-show="cardF">身份证反面照</label>
                                            </div>
                                        </div>
                                    </el-form-item>
                                    </div>
                                    </div>



                                    <el-form-item label="其他">
                                        <div class="el-upload-collect" style="height: 100px">
                                            <div class="el-upload-right" style="left: 0">
                                                <el-upload
                                                    v-bind:action= "uploadUrl"
                                                    name="files"
                                                    list-type="picture-card"
                                                    :limit="0"
                                                    :on-success="handleAvatarSuccessOther"
                                                    :on-preview="handlePictureCardPreview"
                                                    :on-remove="handleRemove"
                                                    :before-upload="beforeAvatarUpload">
                                                    <i class="el-icon-plus"></i>
                                                </el-upload>
                                            </div>
                                        </div>
                                    </el-form-item>

                                    <p class="word_two">2.填写账号注册信息<label class="word_two_i">（请牢记账号信息，用于登陆商户后台）</label></p>
                                    <el-form-item label="登陆名:" prop="linkPhone">
                                        <el-input v-model="form.linkPhone"   type="number" auto-complete="off" placeholder="请输入手机号码" maxlength="20" onkeypress='return(/[\d]/.test(String.fromCharCode(event.keyCode)))'></el-input>
                                    </el-form-item>
                                    <el-form-item label="验证码" class="getcode" prop="logincode">
                                        <span  v-show="show" class="redcolor" @click="getMobileCode">发送验证码</span>
                                        <span  v-show="!show" class="greycolor" :disabled="true">{{count}}s</span>
                                        <el-input v-model="form.logincode"></el-input>
                                    </el-form-item>




                                    <el-form-item label="密码" prop="password">
                                        <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="确认密码" prop="checkPass">
                                        <el-input type="password" v-model="form.checkPass" auto-complete="off"></el-input>
                                    </el-form-item>

                                    <el-form-item label="" prop="againpassword">
                                        <el-checkbox v-model="checked">我已阅读并同意<label style="color: #66b1ff;cursor: pointer" @click="alertTimeComponey">《时间商城商户入驻协议》</label></el-checkbox>
                                    </el-form-item>


                                    <el-form-item class="submit-button" style="margin: 0;float: right">
                                        <router-link :to="'/login'" class="goback_login">< 返回登陆页&nbsp;</router-link>
                                        <el-button type="primary" @click="onSubmit('form')">提交审核</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>

                    </el-scrollbar>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <!-- 详情弹出框 -->
                <el-dialog id="viewDetail" title="时间商城商户入驻协议" :visible.sync="editVisible" width="40%" :lock-scroll='true' top="100px">
                    <el-scrollbar style="height:600px;">
                        <h3 style="text-align: center">时间商城商户入驻协议</h3>
                        <div class="title_first">尊敬的入驻商户，为了维护您的权益，请在点击签署本协议前, 审慎阅读、充分理解本协议各部分规则,特别是协议中与免除或者限制责任的条款、法律适用和争议解决相关的黑体字文字条款。如对本协议有任何疑问,请向您好时间客服咨询。</div>
                        <div class="title_first">本协议是由您好时间科技（深圳）有限公司（以下称“甲方”）与同意并承诺遵守本协议规定使用“时间商城”的法律实体（以下称“乙方”）共同缔结，具有法律效力。</div>
                        <div class="title_first">本协议一经乙方在甲方运营的“时间商城”点击确认即视为乙方已完全理解且同意本协议的全部条款,并视为本协议已经双方签署,协议自甲方为乙方开通服务之日起生效。</div>
                        <div class="title_first">乙方在商城的账号和密码是甲方识别乙方身份及指令的唯一标识,所有使用乙方账号和密码的操作均视为乙方的操作行为。乙方应妥善保管乙方的账号和密码,防止账号及密码泄露,因账号和密码泄露所造成的损失由乙方自行承担。</div>


                        <div class="title_two">一、甲乙双方的权利义务 </div>
                        <div class="title_first" style="text-indent: 0">1.1 甲方的权利义务</div>
                        <div class="title_first">1.1.1 甲方根据本协议向乙方提供“时间商城”的服务，在乙方申请获审核通过后7个工作日内开通服务。</div>
                        <div class="title_first">1.1.2 甲方对乙方提供必要的开店技术咨询，并保证商城系统平台能正常稳定运行，乙方在使用“时间商城”过程中发现异常的，有权及时与甲方取得联系，并记录当前异常现象，便于甲方及时做出诊断；甲方对乙方在使用“时间商城”过程中遇到的问题、建议、意见积极予以回复。</div>
                        <div class="title_first">1.1.3 甲方妥善保管商铺管理员账号并保证其所有经营活动完全符合中国有关法律、法规、行政规章等的规定。</div>
                        <div class="title_first">1.1.4 如乙方是托管商铺，甲方应及时为乙方进行店铺更新并实时进行日常管理（乙方根据有关规定向甲方提供相应运营费用）。</div>
                        <div class="title_first">1.1.5 在本协议有效期限内，甲方有权根据市场情况对商户入驻条件进行调整。</div>
                        <div class="title_first">1.1.6甲方保留在中华人民共和国大陆地区施行之法律允许的范围内可以依据其交易规则和约定自行决定拒绝服务、关闭用户账户、清除或编辑内容或取消项目的权利。</div>
                        <div class="title_first" style="text-indent: 0">1.2 乙方的权利义务 </div>
                        <div class="title_first">1.2.1 保证在“时间商城”提交的注册资料真实、准确、合法、有效，对获得的与自设密码共同使用的时间商城用户名（店铺用户名）妥善保管，不得擅自转让或授权他人使用，并对利用该用户名和密码所进行的一切活动负全部法律责任。</div>
                        <div class="title_first">1.2.2 保证符合本协议约定的入驻条件，保证向甲方提交的证明文件及其他相关证明真实、准确、合法、有效，并保证在上述资料发生变更时及时通知甲方，并在“时间商城”上予以更新。</div>
                        <div class="title_first">1.2.3 乙方保证自身提供及发布于“时间商城”的信息真实、准确、合法、有效。若有不当信息或违法情形，甲方有权在不通知乙方的前提下进行删除或通知更改等其它限制性措施。</div>
                        <div class="title_first">1.2.4 乙方店铺经营方式：乙方店铺内商品，均以乙方自身名义进行商品信息上传、展示、咨询答复、商品销售、发票开具、物流配送服务及售后服务提供等；乙方销售及服务出现争议、纠纷、国家机关机构调查时，由乙方负责。如司法机关因此一并追究了甲方的责任，乙方应向甲方赔偿该损失。</div>
                        <div class="title_first">1.2.5  乙方使用时间商城提供的服务时，应同时接受适用于本商城特定服务、活动等的准则、条款和协议（以下统称为“其他条款”）；如果以下使用条件与“其他条款”有不一致之处，则以“其他条款”为准。</div>
                        <div class="title_first">1.2.6  通过申请成为时间商城商户，即表示用户与甲方已达成协议，自愿接受本服务条款的所有内容。此后，乙方不得以未阅读本协议条款内容作任何形式的抗辩。</div>


                        <div class="title_two">二、入驻条件及证明文件提交</div>
                        <div class="title_first" style="text-indent: 0">
                            2.1 入驻条件乙方申请成为“时间商城”入驻商户，在“时间商城”开展经营活动，须满足以下条件：
                            <br>
                            1) 乙方已依照中华人民共和国法律注册并领取合法有效的营业执照及其他经营许可；
                            <br>
                            2) 乙方申请经营的商品来源合法，资质齐全；
                            <br>
                            3) 乙方同意本协议及时间商城相关规则；
                        </div>
                        <div class="title_first" style="text-indent: 0">2.2 证明文件提交</div>
                        <div class="title_first">2.2.1 乙方须根据时间商城相关规则及要求向甲方提交证明文件或其他相关证明，包括但不限于营业执照、税务登记证、授权委托书、商标注册证、质检报告、报关单、检验检疫证书、产品来源地证明等。</div>
                        <div class="title_first">2.2.2 乙方保证向甲方提供的上述证明文件或其他相关证明真实、合法、准确、有效，并保证上述证明文件或其他相关证明发生任何变更或更新时，及时通知甲方，若上述文件变更或更新导致乙方不符合本协议所规定入驻条件的，甲方有权单方全部或部分限制乙方经营，以及终止本协议。</div>
                        <div class="title_first">2.2.3 乙方对其提交的证明文件或其他相应证明的真实性、合法性、准确性、有效性承担全部法律责任，若因乙方提交虚假、过期文件或未及时更新或通知证明文件导致纠纷或被相关国家机关处罚的，由乙方独立承担全部法律责任，如因此造成时间商城（包括“时间商城”合作方、代理人或职员）损失的，乙方应予以赔偿。</div>



                        <div class="title_two">三、店铺服务开通及停止 </div>
                        <div class="title_first" style="text-indent: 0">
                            3.1 对于乙方拟开展经营的特定店铺，甲方在乙方提出开店申请并满足以下条件后7个工作日内为乙方开通服务，甲方将在服务正式开通前后一个工作日内以手机短信或邮件方式通知乙方。
                            <br>
                            1) 乙方已按照本协议及时间商城相关规则提交证明文件或其他相关证明并已通过甲方审核；
                            <br>
                            2) 乙方已注册成为时间商城用户且本协议已签署生效。
                            <br>
                            3) 乙方同意本协议及时间商城相关规则；
                        </div>
                        <div class="title_first" style="text-indent: 0">3.2 甲方为乙方开通服务后，乙方可利用时间商城用户名及自设密码登陆商户后台，根据时间商城相关规则及流程向乙方特定店铺上传、发布商品信息，与用户交流达成交易，使用本协议约定的其他有偿服务等。</div>



                       <div class="title_first" style="text-indent: 0">3.3 乙方店铺服务的停止：</div>
                        <div class="title_first">3.3.1 乙方需要停止店铺服务的，应至少提前七个工作日向甲方提出申请，经甲方审核同意后由甲方停止该店铺的服务功能；</div>
                        <div class="title_first">3.3.2 出现以下任一情形时，甲方有权随时停止乙方相关店铺的服务；</div>
                        <div class="title_first" style="text-indent: 60px">3.3.2.1 乙方不满足入驻条件的； </div>
                        <div class="title_first"style="text-indent: 60px">3.3.2.2 乙方提供虚假资质文件的； </div>
                        <div class="title_first"style="text-indent: 60px">3.3.2.3 乙方未完成承诺销售额的；</div>
                        <div class="title_first"style="text-indent: 60px">3.3.2.4 乙方产品价格、规格等信息标示错误，导致行政处罚、争议和纠纷的；</div>
                        <div class="title_first"style="text-indent: 60px">3.3.2.5 乙方产品质量、标识不合格的，或者产品涉嫌走私、假冒伪劣、旧货、返修品的；</div>
                        <div class="title_first"style="text-indent: 60px">3.3.2.6 乙方连续30（三十）日或累计45（四十五）日未正常经营店铺的；</div>
                        <div class="title_first"style="text-indent: 60px">3.3.2.7 其他违反本协议约定或“时间商城”规则的，或者其他甲方认为侵犯“时间商城”或消费者权益的。</div>


                        <div class="title_first" style="text-indent: 0">3.4 乙方未经甲方同意，擅自停止店铺经营，或者乙方因为出现（3.3.2）情形被甲方停止店铺服务的，乙方管理后台账户中的未结算金额，将按违约造成的平台损害计算，扣除相应金额作为乙方向甲方支付的违约金，该金额不足以冲抵乙方应付违约金和赔偿金时，乙方应另行支付差额。</div>


                        <div class="title_two">四、费用及结算 </div>
                        <div class="title_first" style="text-indent: 0">4.1 乙方应按照相关标准及支付方式向时间商城支付下述费用：</div>
                        <div class="title_first">4.1.1 通道费与平台分成</div>
                        <div class="title_first" style="text-indent: 60px">
                            4.1.1.1 乙方通过“时间商城”提交的每一笔结算应按照下述费率向“时间商城”支付通道费与平台分成：
                            <br>
                            1）通道费：费率为5%；
                            <br>
                            2）平台分成：商户通过平台所得利润需要与平台分成，双方之间存在分成比率，分成比率和支付方式需经甲乙双方商量后另行协商约定。
                        </div>

                        <div class="title_first" style="text-indent: 60px">
                            4.1.1.2 乙方在“时间商城”的交易额以“时间商城”记录的数据为准，乙方经营的类目以本协议或其他补充协议（若有）约定为准，乙方经营的商品品牌以“时间商城”审核通过的为准。
                        </div>
                        <div class="title_first" style="text-indent: 60px">
                            4.1.1.3 通道费与平台分成由“时间商城”通过系统自买家交付的货款统计计算，并在处理乙方结算请求时直接从申请金额中扣除。
                        </div>



                        <div class="title_first">4.1.2 其他费用 </div>
                        <div class="title_first" style="text-indent: 60px">本协议附件或甲乙双方补充协议（若有）约定的乙方应向“时间商城”支付的其他费用，按照附件或补充协议（若有）的约定收取。</div>



                        <div class="title_first" style="text-indent: 0">4.2 甲乙双方按照下述约定对乙方在“时间商城”完成交易的货款进行结算：</div>
                        <div class="title_first">4.2.1 买家通过“时间商城”与乙方进行交易的，货款须支付至“时间商城”指定账户中。</div>
                        <div class="title_first">4.2.2 乙方按照本协议或其他补充协议（若有）与“时间商城”进行对账，乙方确认无误后，可向“时间商城”发起提现申请，“时间商城”将向乙方指定银行卡打款并通过提现申请。</div>
                        <div class="title_first">4.2.3 乙方须向“时间商城”提供其在“时间商城”指定的第三方支付公司开设的结算账户或银行账户以便“时间商城”完成货款结算，若乙方账户信息变更，应提前3天通知“时间商城”，否则，因乙方变更账户造成货款支付失败、迟延或错误，损失由乙方自行承担。</div>



                        <div class="title_first" style="text-indent: 0">4.3 甲乙双方根据本协议开展的业务以人民币作为结算货币。</div>



                        <div class="title_two">五、保密责任  </div>
                        <div class="title_first" style="text-indent: 0">5.1 甲乙双方对于本协议的签订、内容及在履行本协议期间所获知的另一方的商业秘密负有保密义务。非经对方书面同意，任何一方不得向第三方（关联公司除外）泄露、给予或转让该等保密信息。（根据法律、法规、证券交易所规则向政府、证券交易所和/或其他监管机构提供、双方的法律、会计、商业及其他顾问、雇员除外）。</div>
                        <div class="title_first" style="text-indent: 0">5.2 如对方提出要求，任何一方均应将载有对方保密信息的任何文件、资料或软件等，在本协议终止后按对方要求归还对方，或予以销毁，或进行其他处置，并且不得继续使用这些保密信息。</div>
                        <div class="title_first" style="text-indent: 0">5.3 在本协议终止之后，各方在本条款项下的义务并不随之终止，各方仍需遵守本协议之保密条款，履行其所承诺的保密义务，直到其他方同意其解除此项义务，或事实上不会因违反本协议的保密条款而给其他方造成任何形式的损害时为止。</div>



                        <div class="title_two">六、违约责任 </div>
                        <div class="title_first" style="text-indent: 0">6.1 乙方向甲方提供虚假、失效的证明文件或其他相关证明，在“时间商城”发布错误、虚假、违法及不良信息或进行其他违反本协议约定的行为，给甲方及/或“时间商城”造成任何损失的（损失包括但不限于诉讼费、律师费、赔偿、补偿、行政机关处罚、差旅费等），乙方同意在甲方通知乙方后，自乙方管理后台账户的未结算金额中直接予以扣除，本协议另有约定的除外。</div>
                        <div class="title_first" style="text-indent: 0">6.2 乙方违反本协议时，甲方除有权按照本条约定要求乙方承担违约责任外，还有权按照平台相关管理规则采取商品立即下架、暂停向乙方提供服务、暂时关闭乙方后台管理账户、暂缓支付未结算款项、终止合作等措施。</div>



                        <div class="title_two"> 七、承诺与保证 </div>
                        <div class="title_first" style="text-indent: 0">乙方承诺其为个人时，拥有完全权利能力和行为能力签署及履行本协议,签署本协议是乙方的真实意思表示。本协议对乙方具有约束力。 乙方为法人时，不存在涉及不能履行本协议的刑事、行政、民事诉讼程序、调解程序、仲裁程序、行政处罚程序或其他争议。</div>




                        <div class="title_two"> 八、协议的生效 </div>
                        <div class="title_first" style="text-indent: 0">本协议自乙方同意并在“时间商城”通过商户入驻审核后生效，持续对缔约双方有效，除非发生本协议上述所述的终止或解除事项。</div>




                        <div class="title_two"> 九、协议的变更  </div>
                        <div class="title_first" style="text-indent: 0">9.1本协议约定的缔约双方基本信息变更的，变更方应于发生该等变更事项后15日内向另一方发出变更的通知及证明文件，未及时通知另一方的，应对变更事项所造成的后果承担全部法律责任。若乙方不履行上述通知义务,甲方或甲方委托的第三方、司法机关、仲裁机构等按照乙方原通讯地址寄送有关通知、文件、司法文书的,视为已送达。如无人签收或者拒收的,文书退回之日即视为送达之日。</div>
                        <div class="title_first" style="text-indent: 0"> 9.2  根据国家法律法规变化及网站运营需要，甲方有权对本协议条款不时地进行修改，修改后的协议一旦被在本商城上更新即生效。乙方可随时登陆查阅最新协议；乙方有义务不时关注并阅读最新版的协议、其他条款及网站公告。如乙方不同意更新后的协议，可以且应立即停止接受时间商城依据本协议提供的服务；如乙方继续使用时间商城提供的服务的，即视为同意更新后的协议。乙方在使用时间商城之前应阅读本协议及时间商城的公告。</div>



                        <div class="title_two"> 十、协议的终止及解除  </div>
                        <div class="title_first" style="text-indent: 0">10.1 本协议在双方签署新协议替代本协议的情形下自然终止。</div>
                        <div class="title_first" style="text-indent: 0">10.2 除本协议另有约定外，缔约双方中任一方在本协议有效期内提前终止本协议的，须提前15天以书面形式通知对方，经对方同意后终止本协议。</div>
                        <div class="title_first" style="text-indent: 0">
                            10.3 乙方有下述情形时，甲方可单方解除本协议：
                            <br>
                            1) 乙方任一店铺未达成约定销售额的；
                            <br>
                            2) 乙方任一店铺未正常经营，在服务期内累计达到45（四十五）日或者连续达到30（三十）日的；
                            <br>
                            3) 乙方违反本协议约定或者“时间商城”平台规则规定的相关义务，经甲方通知后拒不改正的；
                            <br>
                            4) 本协议约定的其他甲方可单方解除本协议的。
                        </div>
                        <div class="title_first" style="text-indent: 0">10.4 协议终止后后续事项的处理</div>
                        <div class="title_first">10.4.1 双方合作终止后，自终止合作之日起，甲方将关闭乙方“时间商城用户名”账户权限，并对乙方商品全部下架，乙方将无法再通过该账户进行任何形式的操作且时间商城前端网站不再显示任何乙方商品信息。</div>
                        <div class="title_first">10.4.2 本协议终止后，甲方有权保留乙方的注册信息及交易行为记录等数据，但甲方没有为乙方保留这些数据的义务，亦不承担在协议终止后向乙方或第三方转发任何未阅读或未发送的信息的义务，也不就协议终止向乙方或任何第三方承担责任。法律另有规定的除外。</div>
                        <div class="title_first">10.4.3 自终止合作之日起三十日内，甲乙双方进行退场清算，包括但不限于财务对账及其他相关事物的处理。</div>
                        <div class="title_first">10.4.4 双方合作终止，并不免除乙方依据本协议应向客户承担的售后服务及产品保证责任，乙方仍应按照本协议附件关于售后服务的相关约定履行售后服务义务及产品质量保证责任；如在甲乙双方合作终止后，因乙方商品质量问题或售后服务问题而导致甲方或其他第三方人身或财产损失的，乙方仍应独立承担全部责任。</div>




                        <div class="title_two"> 十一、通知及送达 </div>
                        <div class="title_first" style="text-indent: 0">一方发给另一方的与本协议有关的通知应以书面形式送达，或以短信、电子邮件、管理后台公告或消息等发送。以短信、电子邮件、管理后台公告或消息发送的，发送当日为送达日。</div>



                        <div class="title_two"> 十二、可分性 </div>
                        <div class="title_first" style="text-indent: 0">如果本协议中任何一条被视为废止、无效或因任何理由不可执行，该条应视为可分的且并不影响任何其余条款的有效性和可执行性。</div>


                        <div class="title_two"> 十三、其他约定 </div>
                        <div class="title_first" style="text-indent: 0">本协议适用中华人民共和国的法律、法规。 本协议解释权归属于您好时间科技（深圳）有限公司。</div>
                        <div class="title_first" style="text-indent: 0">13.1  因本入驻协议发生的任何法律纠纷，双方无法协商解决的，提交您好时间科技有限公司注册地法院进行诉讼。</div>
                        <div class="title_first" style="text-indent: 0">13.2  您好时间公司不行使、未能及时行使或者未充分行使本协议或者按照法律规定所享有的权利，不应被视为放弃该权利，也不影响您好时间科技（深圳）有限公司在将来行使该权利。</div>




                    </el-scrollbar>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="editVisible = false" type="primary">关闭窗口</el-button>
                    </span>
                </el-dialog>
            </div>


        </div>
    </div>
</template>

<script>
    import { uploadGoodsImg,userRegister,checkUser } from "../common/request/request";
    export default {
        name: "tenants",
        data(){
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.form.checkPass !== '') {
                        this.$refs.form.validateField('checkPass');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            let commercialNamePass = (rule, value, callback) => {
                if (value) {
                    checkUser({'commercialName':value}).then(res =>{
                        if(res.code === "0"){
                            console.log(res);
                            callback();
                        }else {
                            this.form.commercialName = '';
                            callback(new Error(''+res.msg+''));
                        }
                    }).catch(err =>{
                        console.log(err)
                    })
                } else {
                    callback(new Error('请输入商户名'));
                }
            };
            return {
                show: true,
                count: '',
                timer: null,

                uploadUrl:'',
                editVisible:false,
                card:true,
                cardF:true,
                imageUrl: '',
                cardimageUrl:'',
                cardfimageUrl:'',
                person_commoney:'个人商户',
                checked:true,
                dialogImageUrl: "",
                dialogVisible: false,
                searchGoodsName: 0,
                val: 0,
                form: {
                    commercialType:'individual',//商户类型(individual:个体,corporate:团体)
                    commercialName: "",//商户名称
                    linkName: "",//联系人姓名
                    linkPhone: null,//联系人电话
                    moneyPerson: null,
                    bankNo: "",//银行卡卡号
                    specification:'',
                    creditCode:'',//企业统一信用代码
                    licenseImgPath:'',//营业执照图片
                    cardFrontImgPath:'',//身份证正面照
                    cardBackImgPath:'',//身份证反面照
                    otherImgPath:'',
                    loginname:'',
                    logincode:'',
                    password:'',//登陆密码
                    checkPass: '',
                },
                rules:{
                    logincode:[
                        {required: true, message: "请输入验证码", trigger: "blur" }
                    ],
                    cardBackImgPath:[
                        {required: true, message: "请上传身份证反面照", trigger: "blur" }
                    ],
                    cardFrontImgPath:[
                        {required: true, message: "请上传身份证正面照", trigger: "blur" }
                    ],
                    licenseImgPath:[
                        {required: true, message: "请上传营业执照", trigger: "blur" }
                    ],
                    linkName: [
                        {required: true, message: "请联系人联系人姓名", trigger: "blur" }
                    ],
                    moneyPerson: [
                        {required: true, message: "请输入收款人姓名", trigger: "blur" }
                    ],
                    bankNo: [
                        {required: true, message: "请输入收款人银行卡号", trigger: "blur" }
                    ],
                    specification: [
                        {required: true, message: "请输入营业执照名称", trigger: "blur" }
                    ],
                    creditCode: [
                        {required: true, message: "请输入统一社会信用代码", trigger: "blur" }
                    ],
                    loginname: [
                        {required: true, message: "请输入用户名", trigger: "blur" }
                    ],

                    commercialName: [
                        {required: true,validator: commercialNamePass, trigger: 'blur' }
                    ],
                    linkPhone: [
                        {required: true, message: "请输入用户名", trigger: 'blur' }
                    ],
                    password: [
                        {required: true, validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        {required: true, validator: validatePass2, trigger: 'blur' }
                    ],
                }
            };
        },
        created(){
            this.uploadUrl = uploadGoodsImg()
        },
        methods: {
            /**
             * 输入框失去焦点触发
             */

            /**
             * 获取手机验证码
             */
            getMobileCode(){
                debugger;
                const TIME_COUNT = 60;
                if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.show = false;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                        } else {
                            this.show = true;
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000)
                }
            },
            /**
             * 用户协议
            */

            alertTimeComponey(){
                this.editVisible = true
            },
             /**
             * 个人商户与企业商户切换
             */
            personComponey(){
                let status = this.form.commercialType;
                if(status === 'individual'){
                    this.form.commercialType = 'corporate';
                    this.person_commoney = '团体商户'
                }else {
                    this.form.commercialType = 'individual'
                    this.person_commoney = '个人商户'
                }
            },
            handleInput(e) {
                e = e.replace(/[^\d]/g, "");
            },
            onSubmit(formName) {
                console.log(this.form);
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        console.log(JSON.stringify(this.form));
                        this.$message.success("提交成功！");
                    } else {
                        this.$message.error("提交失败!");
                        return false;
                    }
                });
                // this.$message.success("提交成功！");
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            /**
             *成功上传营业执照
             *
             */
            handleAvatarSuccess(res, file) {
                console.log("Files:"+JSON.stringify(file));
                console.log("res:"+JSON.stringify(res));
                if(res.code === "0"){
                    this.form.licenseImgPath = res.data
                    this.imageUrl = URL.createObjectURL(file.raw);
                }

            },
            /**
             * 成功上传身份证正面照
             * @param res
             * @param file
             */
            handleAvatarSuccessCard(res, file){
                if(res.code === "0"){
                    this.card = false
                    this.form.cardFrontImgPath  = res.data
                    this.cardimageUrl = URL.createObjectURL(file.raw);
                }

            },
            /**
             * 成功上传身份证反面照
             * @param res
             * @param file
             */
            handleAvatarSuccessCardF(res,file){
                if(res.code === "0"){
                    this.cardF = false
                    this.form.cardBackImgPath  = res.data
                    this.cardfimageUrl = URL.createObjectURL(file.raw);
                }

            },
            /**
             * 上传其他照片
             */
            handleAvatarSuccessOther(res,file){
                console.log(res);
                console.log(file);
                if(res.code === "0"){
                    if( this.form.otherImgPath){
                        this.form.otherImgPath  = res.data
                    }else {
                        this.form.otherImgPath  = this.form.otherImgPath+'#'+res.data
                    }
                }
            },
            /**
             * 开始上传
             * @param file
             * @returns {boolean}
             */
            beforeAvatarUpload(file) {
                console.log(file);
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                // let param = new FormData(); // 创建form对象
                // param.append('files', file,file.name);// 通过append向form对象添加数据
                // uploadGoodsImg(param).then(res =>{
                //     console.log(res)
                // }).catch(err =>{
                //     console.log(err)
                // });
                return isJPG && isLt2M;
            }
        }

    }
</script>

<style scoped>
    .getcode{
        position: relative;
    }
    .redcolor{
        background-color: #ec414d;
        position: absolute;
        right: 0;
        color: white;
        height: 30px;
        border: none;
        width: 80px;
        line-height: 30px;
        text-align: center;
        border-radius: 5px;
        cursor: pointer;
    }
    .greycolor{
        background-color: darkgray;
        position: absolute;
        right: 0;
        color: white;
        height: 30px;
        border: none;
        width: 80px;
        line-height: 30px;
        text-align: center;
        border-radius: 5px;
        cursor: pointer;
    }

    .form_tenants{
        background-color: white;
    }
    .a_link{
        background-color: white;
        padding: 10px 10px 10px 0;
        color: #EC414D;
        font-size: 16px;
        margin: 10px 0px 20px 0px;
    }
    .a_link a:first-child{
        border-left: 2px solid #EC414D;
    }
    .a_link a{
        color: #EC414D;

    }
    .tenants{
        height: 100%;
        width: 100%;
        background-color: #eeeeee;
    }
    .tenants_title{
        background-color: #EC414D;
        margin: 0;
        padding: 10px 10px 10px 0;
        text-indent: 15px;
        color: white;
        font-size: 20px;
    }



    .linecard {
        position: absolute;
        left: 0;
    }
    .allCardImg{
        position: relative;
        height: 150px;
    }
    .cardFimg{
        position: absolute;
        top: 0;
    }
    .title_two{
        font-size: 16px;
        color: #0e0908;

    }
    .title_first{
        text-indent: 30px;
        width: 90%;
        margin: auto;
        padding: 5px 0;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }


    .photo_word{
        position: absolute;
        top: 60%;
        left: 0;
        right: 0;
        text-align: center;
        font-size: 10px;
    }
    .bank_word{
        color: #EC414D;
    }
    .word_two_i{
        color: darkgray;
        font-size: 12px;
    }
    .word_two{
        margin: 30px 0px 30px 20px;
    }
    .goback_login{
        color: #66b1ff;
    }
    .tenants_photo{
        width: 110px;text-align: right
    }
    .form_tenants{
        background-color: white;
    }
    .tenants_person{
        margin: 0;
        color: #66b1ff;
        text-align: left;
        cursor: pointer;
    }
    .a_link{
        background-color: white;
        padding: 10px 10px 10px 0;
        color: #EC414D;
        font-size: 16px;
        margin: 10px 0px 20px 0px;
    }
    .a_link a:first-child{
        border-left: 2px solid #EC414D;
    }
    .a_link a{
        color: #EC414D;

    }
    .tenants{
        height: 100%;
        width: 100%;
        background-color: #eeeeee;
    }
.tenants_title{
    background-color: #EC414D;
    margin: 0;
    padding: 10px 10px 10px 0;
    text-indent: 15px;
    color: white;
    font-size: 20px;
}



    .form-box {
        margin: auto;
        width: 450px;
    }
    /* .el-input__inner::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    .el-input__inner::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }
    .input__inner::-webkit-textfield-decoration-container {
       background-color: #f0f3f9;
    }  */
    /* .upload-picture{
            width: 100px;
            height: 100px;
        } */
    .el-upload-collect {
        position: relative;
        height: 150px;
        width: 1100px;
        font-size: 14px;
        color: #606266;
        text-align: left;
        margin-bottom: 15px;
    }
    .el-upload-collect p {
        padding-top: 30px;
        padding-left: 20px;
    }
    .el-upload-right {
        position: absolute;
        left: 9.3%;
        top: 0;
    }
    .product-details {
        margin-left: -70px;
        font-size: 14px;
        color: #606266;
    }
    .submit-button {
        margin: 0 100px;
    }
</style>
